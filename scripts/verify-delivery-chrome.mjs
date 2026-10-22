import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import ts from 'typescript';
import { builtinModules, isBuiltin } from 'node:module';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { isDeepStrictEqual } from 'node:util';
import { readFile, writeFile, mkdir, realpath, lstat, readdir, copyFile, constants } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const started = new Date().toISOString();
const checks = [];
const hash = value => createHash('sha256').update(value).digest('hex');
function need(condition, code) { if (!condition) throw new Error(code); }
function pass(name) { checks.push({ name, status: 'PASS' }); }
const inside = (root, value) => value !== root && value.startsWith(root + path.sep);
async function exists(value) { try { await lstat(value); return true; } catch (error) { if (error.code === 'ENOENT') return false; throw error; } }
async function noLinks(value) {
  for (let current = value; ; current = path.dirname(current)) {
    if (await exists(current)) need(!(await lstat(current)).isSymbolicLink(), 'SYMLINK_PATH_REJECTED');
    if (current === path.dirname(current)) break;
  }
}
async function jsonFile(file, value) { await writeFile(file, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' }); }
async function inventory(root) {
  const result = [];
  async function walk(dir) {
    for (const name of (await readdir(dir)).sort()) {
      const file = path.join(dir, name), stat = await lstat(file);
      need(!stat.isSymbolicLink(), 'OUTPUT_LINK_REJECTED');
      if (stat.isDirectory()) await walk(file);
      else {
        need(stat.isFile(), 'OUTPUT_SPECIAL_FILE_REJECTED');
        const bytes = await readFile(file);
        result.push({ path: path.relative(root, file), bytes: bytes.length, sha256: hash(bytes), mode: (stat.mode & 0o777).toString(8) });
      }
    }
  }
  await walk(root);
  return result;
}
function canonical(value) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') { need(Number.isFinite(value), 'NONFINITE_SYNTHETIC_INPUT'); return JSON.stringify(value); }
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  need(value && Object.getPrototypeOf(value) === Object.prototype, 'NON_JSON_SYNTHETIC_INPUT');
  return '{' + Object.keys(value).sort().map(key => {
    need(/^[\x00-\x7f]*$/.test(key), 'NON_ASCII_KEY');
    return JSON.stringify(key) + ':' + canonical(value[key]);
  }).join(',') + '}';
}
function freeze(value) {
  if (value && typeof value === 'object') { for (const child of Object.values(value)) freeze(child); Object.freeze(value); }
  return value;
}
const target = Object.freeze({ origin: 'https://portfolio-delivery.invalid', space: 'mock-portfolio-space', environment: 'mock-published', locale: 'en-US' });
const types = ['siteSettings', 'personProfile', 'socialLink', 'navigationItem', 'project', 'article', 'experienceItem', 'skill', 'skillGroup', 'tool'];
const marker = 'SYNTHETIC_PRIVATE_MARKER_FOR_MOCK_BOUNDARY';
const snapshotId = 'mock-global-chrome-snapshot-v1';
function contextJSON(context) { return { audience: context.audience, policy: { ...context.policy, reviewedAccessibility: [...context.policy.reviewedAccessibility], employmentPrecision: [...context.policy.employmentPrecision] }, revisionFacts: [...context.revisionFacts] }; }
function scenario(fixtures, siteName, navLabel) {
  const entries = structuredClone(fixtures.representativeEntries).map(entry => ({
    kind: 'Entry', id: entry.sys.id, contentTypeId: entry.sys.contentType.sys.id,
    revisionToken: 'synthetic-revision-' + entry.sys.id, fields: entry.fields,
  })).sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  const assets = structuredClone(fixtures.representativeAssets).map(asset => ({
    kind: 'Asset', id: asset.sys.id, revisionToken: 'synthetic-revision-' + asset.sys.id, fields: asset.fields,
  })).sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  const expected = structuredClone(fixtures.siteChrome);
  if (siteName !== undefined) { entries.find(entry => entry.contentTypeId === 'siteSettings').fields.siteName['en-US'] = siteName; expected.siteName = siteName; }
  if (navLabel !== undefined) {
    const id = expected.primaryNavigation[0].id;
    entries.find(entry => entry.id === id).fields.label['en-US'] = navLabel;
    for (const items of [expected.primaryNavigation, expected.footerNavigation]) for (const item of items) if (item.id === id) item.label = navLabel;
  }
  const row = record => ({ id: record.id, ...(record.kind === 'Entry' ? { contentTypeId: record.contentTypeId } : {}), revisionToken: record.revisionToken, recordSha256: hash(canonical(record)) });
  const manifest = freeze({ kind: 'SYNTHETIC_EXPECTED_POPULATION', target: { ...target }, snapshotId, contentTypes: [...types], entries: entries.map(row), assets: assets.map(row) });
  const context = {
    audience: 'PUBLIC',
    policy: {
      locale: 'en-US', articlePrecision: 'day', sourceComparison: 'STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION',
      reviewedAccessibility: new Map(fixtures.sourceFixtureContextPolicy.reviewedAccessibility.map(item => [item.id, { kind: 'meaningful', alt: item.text }])),
      employmentPrecision: new Map(fixtures.sourceFixtureContextPolicy.employmentPrecision.map(item => [item.id, 'month'])),
    },
    revisionFacts: new Map([...entries, ...assets].map(item => [item.id, { revision: item.revisionToken, publication: 'published-revision', publicSafety: 'approved' }])),
  };
  freeze(entries); freeze(assets); freeze(expected);
  const requests = [];
  const transport = async (request, signal) => {
    need(!signal.aborted, 'UNEXPECTED_ABORT');
    need(isDeepStrictEqual(Object.keys(request).sort(), ['mode', 'method', 'target', 'collection', 'snapshotId', 'skip', 'limit', 'credentialMarker'].sort()), 'REQUEST_SHAPE');
    need(request.mode === 'SYNTHETIC_MOCK_ONLY' && request.method === 'GET' && isDeepStrictEqual(request.target, target) && request.snapshotId === snapshotId && request.limit === 25 && request.credentialMarker === marker, 'REQUEST_BINDING');
    const population = request.collection === 'entries' ? entries : request.collection === 'assets' ? assets : null;
    need(population !== null, 'REQUEST_COLLECTION');
    const body = new TextEncoder().encode(canonical({
      schema: 'portfolio-mock-page-v1', target: { ...target }, snapshotId, collection: request.collection,
      skip: request.skip, limit: 25, total: population.length,
      items: structuredClone(population.slice(request.skip, request.skip + 25)),
    }));
    requests.push({ collection: request.collection, skip: request.skip, limit: request.limit, returned: Math.min(25, population.length - request.skip), bodyBytes: body.length });
    return { status: 200, redirected: false, finalTarget: { ...target }, body };
  };
  return { options: { transport, credentialMarker: marker, manifest, context }, entries, assets, expected, requests };
}
function inputIdentity(input) { return hash(canonical({ entries: input.entries, assets: input.assets, manifest: input.options.manifest, context: contextJSON(input.options.context) })); }
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' })[char]);
function anchors(markup) { return [...markup.matchAll(/<a href="([^"]*)">([^<]*)<\/a>/g)].map(match => ({ href: match[1], label: match[2] })); }
function inspectHTML(html, expected, styles, css) {
  need(html.startsWith('<!doctype html><html lang="en-US">'), 'HTML_DOCUMENT');
  need(html.includes('<meta name="robots" content="noindex, nofollow"/>'), 'NONINDEXABILITY');
  need(html.includes('Offline portfolio demonstration — not a release.'), 'OFFLINE_NOTICE');
  need(html.includes('<h1>Mock delivery verification</h1>') && /<main id="main-content"[^>]*>/.test(html), 'NEUTRAL_MAIN');
  need(html.includes('<a href="/">' + escapeHTML(expected.siteName) + '</a>'), 'EXPECTED_SITE_NAME');
  const primary = html.match(/<nav aria-label="Primary"><ul[^>]*>(.*?)<\/ul><\/nav>/s);
  const footer = html.match(/<nav aria-label="Footer"><ul[^>]*>(.*?)<\/ul><\/nav>/s);
  need(primary && footer, 'EXPECTED_NAVIGATION');
  const expectedAnchors = items => items.map(item => ({ href: escapeHTML(item.href), label: escapeHTML(item.label) }));
  need(isDeepStrictEqual(anchors(primary[1]), expectedAnchors(expected.primaryNavigation)), 'PRIMARY_ORDER_HREFS_LABELS');
  need(isDeepStrictEqual(anchors(footer[1]), expectedAnchors([...expected.footerNavigation, ...expected.socialLinks])), 'FOOTER_SOCIAL_ORDER_HREFS_LABELS');
  need(!/<script\b/i.test(html), 'NO_CLIENT_SCRIPT_OR_BOOTSTRAP');
  for (const privateValue of [marker, snapshotId, 'MOCK_ACQUISITION_RECEIPT', 'recordSha256', 'revisionFacts', 'portfolio-offline-snapshot', 'synthetic-revision-', '"linkType"', '"fields":', '"sys":', 'hydrateRoot', 'portfolio-data']) need(!html.includes(privateValue), 'PRIVATE_VALUE_LEAK');
  need(!/<link[^>]*rel="canonical"/.test(html), 'NO_PRODUCTION_CANONICAL');
  for (const style of styles) need(html.includes('<link rel="stylesheet" href="' + style + '"/>'), 'REFERENCED_EMITTED_CSS');
  for (const match of html.matchAll(/class="([^"]+)"/g)) for (const name of match[1].split(/\s+/)) need(css.includes('.' + name), 'EMITTED_CLASS_STYLE');
}
function manifestPlugin() {
  return { name: 'mock-delivery-private-module-manifest', generateBundle(_, bundle) {
    const chunks = Object.values(bundle).filter(item => item.type === 'chunk').map(item => ({
      file: item.fileName, entry: item.isEntry, imports: item.imports, dynamicImports: item.dynamicImports, modules: Object.keys(item.modules).sort(),
    }));
    this.emitFile({ type: 'asset', fileName: 'module-import-manifest.json', source: JSON.stringify(chunks, null, 2) + '\n' });
  } };
}
async function verifyImports(bundleDir, workspace, toolsDir, renderer) {
  const manifest = JSON.parse(await readFile(path.join(bundleDir, 'module-import-manifest.json'), 'utf8'));
  const allFiles = await inventory(bundleDir), modules = manifest.flatMap(chunk => chunk.modules);
  if (renderer) for (const suffix of ['/src/content/portfolio/delivery.server.ts', '/src/content/portfolio/delivery-snapshot.ts', '/src/content/portfolio/source.ts', '/src/components/layout/PortfolioLayout.tsx']) need(modules.some(module => module.endsWith(suffix)), 'REQUIRED_BOUNDARY_MODULE');
  if (renderer) need(!modules.some(module => /\/(?:entry-client|entry-server|PageView)\.tsx|\/(?:source-fixtures|normalized-fixtures)\.ts/.test(module)), 'RENDERER_PRIVATE_GRAPH_SEPARATION');
  for (const module of modules) {
    const file = module.replace(/^\0/, '').split('?')[0];
    if (path.isAbsolute(file)) need(inside(workspace, file) || inside(toolsDir, file), 'FOREIGN_MODULE_PATH');
  }
  const imports = [];
  function verify(specifier, file, kind) {
    if (isBuiltin(specifier)) { imports.push({ file, kind, specifier, scope: 'NODE_BUILTIN' }); return; }
    need(specifier.startsWith('./') || specifier.startsWith('../'), 'UNEXPECTED_BARE_EXTERNAL_IMPORT');
    const resolved = path.resolve(bundleDir, path.dirname(file), specifier);
    need(inside(bundleDir, resolved) && allFiles.some(member => path.join(bundleDir, member.path) === resolved), 'UNRESOLVED_OR_ESCAPING_CHUNK');
    imports.push({ file, kind, specifier, scope: 'PRIVATE_BUNDLE' });
  }
  for (const chunk of manifest) for (const specifier of [...chunk.imports, ...chunk.dynamicImports]) verify(specifier.startsWith('.') || isBuiltin(specifier) ? specifier : './' + specifier, chunk.file, 'BUNDLER_MANIFEST');
  for (const file of allFiles.filter(member => /\.(?:mjs|js)$/.test(member.path))) {
    const text = await readFile(path.join(bundleDir, file.path), 'utf8');
    const parsed = ts.createSourceFile(file.path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
    need(parsed.parseDiagnostics.length === 0, 'EMITTED_PARSE_FAILURE');
    const visit = node => {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) { need(ts.isStringLiteral(node.moduleSpecifier), 'NON_LITERAL_STATIC_IMPORT'); verify(node.moduleSpecifier.text, file.path, 'EMITTED_STATIC_IMPORT'); }
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && /^(?:require|__require)$/.test(node.expression.text)))) {
        need(node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0]), 'DYNAMIC_OR_OPAQUE_IMPORT');
        verify(node.arguments[0].text, file.path, 'EMITTED_CALL_IMPORT');
      }
      ts.forEachChild(node, visit);
    };
    visit(parsed);
  }
  return { modules, imports, files: allFiles };
}
let output;
let reportWritable = false;
const report = { started_utc: started, provenance: 'SYNTHETIC_MOCK_ONLY', contentful_verified: false, public_delivery_verified: false, browser_checks: 'NOT RUN', checks, command_attempts: [] };
try {
  need(process.argv.length === 8, 'EXPLICIT_ARGUMENTS_REQUIRED');
  const options = new Map();
  for (let index = 2; index < process.argv.length; index += 2) { need(!options.has(process.argv[index]), 'DUPLICATE_ARGUMENT'); options.set(process.argv[index], process.argv[index + 1]); }
  need([...options.keys()].sort().join() === ['--cache-dir', '--output-dir', '--workspace-root'].join(), 'EXPLICIT_ARGUMENTS_REQUIRED');
  const scriptWorkspace = await realpath(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
  const workspace = path.resolve(options.get('--workspace-root'));
  need(workspace === scriptWorkspace && await realpath(workspace) === workspace, 'WORKSPACE_IDENTITY');
  const run = path.resolve(workspace, '../..'), toolsDir = path.join(run, 'tools');
  need(path.basename(workspace) === 'ui-gallery-system' && path.basename(path.dirname(workspace)) === 'candidate' && /^mock-delivery-isolated-\d{8}T\d{12}Z-[a-f0-9]{8}$/.test(path.basename(run)), 'ISOLATED_RUN_REQUIRED');
  need(await exists(path.join(run, 'RUN-BINDING.json')) && !await exists(path.join(workspace, '.git')), 'RUN_BINDING_REQUIRED');
  const binding = JSON.parse(await readFile(path.join(run, 'RUN-BINDING.json'), 'utf8'));
  need(binding.run === run && binding.candidate === workspace && binding.authorization_id === 'mock-delivery-isolation-1', 'RUN_BINDING_MISMATCH');
  output = path.resolve(options.get('--output-dir'));
  const cache = path.resolve(options.get('--cache-dir'));
  need(inside(path.join(run, 'outputs'), output) && inside(path.join(run, 'cache'), cache), 'PATH_OUTSIDE_RUN');
  for (const value of [workspace, output, cache]) await noLinks(value);
  need(!await exists(output) && !await exists(cache), 'FRESH_ATTEMPT_DIRECTORIES_REQUIRED');
  await mkdir(output, { recursive: true }); reportWritable = true; await mkdir(cache, { recursive: true });
  report.bindings = { run, workspace, output, cache };
  pass('Explicit canonical private source/cache/output bindings; fresh output with no promotion');
  const privateDir = path.join(output, 'private');
  await mkdir(privateDir);
  const rendererDir = path.join(privateDir, 'renderer'), fixtureDir = path.join(privateDir, 'fixtures');
  const fixtureEntry = path.join(toolsDir, 'fixture-loader-' + path.basename(output) + '.ts');
  need(/^[A-Za-z0-9._-]+$/.test(path.basename(output)), 'UNSAFE_ATTEMPT_NAME');
  const sourceFixture = path.join(workspace, 'src/data/portfolio/source-fixtures.ts');
  const normalizedFixture = path.join(workspace, 'src/data/portfolio/normalized-fixtures.ts');
  await writeFile(fixtureEntry, 'export { representativeEntries, representativeAssets, sourceFixtureContextPolicy } from ' + JSON.stringify(sourceFixture) + ';\nexport { siteChrome } from ' + JSON.stringify(normalizedFixture) + ';\n', { flag: 'wx' });
  report.fixture_loader = { path: fixtureEntry, sha256: hash(await readFile(fixtureEntry)) };
  const buildOne = async (entry, outDir, label, styling) => {
    const attempt = { kind: 'VITE_PROGRAMMATIC_BUILD', label, started_utc: new Date().toISOString(), entry, outDir, configFile: false, envDir: false, publicDir: false, root: workspace, cacheDir: path.join(cache, label), ssrNoExternal: true };
    report.command_attempts.push(attempt);
    try {
      await build({
        configFile: false, envDir: false, publicDir: false, root: workspace, cacheDir: attempt.cacheDir,
        plugins: [...(styling ? [vanillaExtractPlugin(), react()] : []), manifestPlugin()],
        ssr: { noExternal: true, external: [...builtinModules, ...builtinModules.map(name => 'node:' + name)] },
        build: { target: 'node22', ssr: entry, ssrEmitAssets: true, outDir, emptyOutDir: false, sourcemap: false, minify: false, assetsInlineLimit: 0, manifest: true,
          rollupOptions: { input: entry, output: { format: 'es', entryFileNames: 'entry.mjs', chunkFileNames: 'chunks/[name]-[hash].mjs', assetFileNames: 'assets/[name]-[hash][extname]' } } },
      });
      attempt.status = 'PASS';
    } catch { attempt.status = 'FAIL'; throw new Error('ISOLATED_BUNDLE_FAILED'); }
    finally { attempt.completed_utc = new Date().toISOString(); }
  };
  await buildOne(path.join(workspace, 'src/portfolio/entry-delivery-server.tsx'), rendererDir, 'renderer', true);
  await buildOne(fixtureEntry, fixtureDir, 'fixtures', false);
  report.renderer_imports = await verifyImports(rendererDir, workspace, toolsDir, true);
  report.fixture_imports = await verifyImports(fixtureDir, workspace, toolsDir, false);
  pass('Actual emitted import graph is closed within private bundle and Node builtins');
  const cssFiles = report.renderer_imports.files.filter(file => file.path.endsWith('.css'));
  need(cssFiles.length > 0 && cssFiles.every(file => /^assets\/[A-Za-z0-9._-]+\.css$/.test(file.path) && file.bytes > 0), 'REQUIRED_CSS_MISSING');
  const styles = cssFiles.map(file => './' + file.path);
  const css = (await Promise.all(cssFiles.map(file => readFile(path.join(rendererDir, file.path), 'utf8')))).join('\n');
  const fixtures = await import(pathToFileURL(path.join(fixtureDir, 'entry.mjs')).href);
  const { renderDeliveryDocument } = await import(pathToFileURL(path.join(rendererDir, 'entry.mjs')).href);
  const representative = scenario(fixtures), before = inputIdentity(representative);
  need(representative.entries.length > 25 && representative.assets.length > 0 && isDeepStrictEqual([...new Set(representative.entries.map(entry => entry.contentTypeId))].sort(), [...types].sort()), 'COMPLETE_REPRESENTATIVE_POPULATION');
  const result = await renderDeliveryDocument(representative.options, styles);
  need(result.ok, 'REPRESENTATIVE_RENDER_FAILED');
  need(isDeepStrictEqual(result.privateEvidence.chrome, representative.expected), 'INDEPENDENT_CHROME_ORACLE');
  inspectHTML(result.html, representative.expected, styles, css);
  need(inputIdentity(representative) === before, 'CALLER_INPUT_CHANGED');
  need(representative.requests.length === Math.ceil(representative.entries.length / 25) + Math.ceil(representative.assets.length / 25), 'MEASURED_PAGINATION');
  const receipt = result.privateEvidence.receipt;
  need(receipt.kind === 'MOCK_ACQUISITION_RECEIPT' && receipt.provenance === 'SYNTHETIC_MOCK_ONLY' && receipt.contentful_verified === false && receipt.public_delivery_verified === false && receipt.coverage === 'COMPLETE' && receipt.normalization === 'VALIDATED', 'PRIVATE_RECEIPT_PROVENANCE');
  need(receipt.manifestDigest === hash(canonical(representative.options.manifest)) && receipt.snapshotId === snapshotId && isDeepStrictEqual(receipt.target, target) && isDeepStrictEqual(receipt.inventory, { entries: representative.options.manifest.entries, assets: representative.options.manifest.assets }), 'INDEPENDENT_RECEIPT_BINDING');
  need(isDeepStrictEqual(receipt.counts, { requests: representative.requests.length, pages: representative.requests.length, entries: representative.entries.length, assets: representative.assets.length, records: representative.entries.length + representative.assets.length, bodyBytes: representative.requests.reduce((sum, request) => sum + request.bodyBytes, 0) }), 'MEASURED_RECEIPT_COUNTS');
  const publicDir = path.join(output, 'public'); await mkdir(path.join(publicDir, 'assets'), { recursive: true });
  await writeFile(path.join(publicDir, 'index.html'), result.html, { flag: 'wx' });
  for (const file of cssFiles) await copyFile(path.join(rendererDir, file.path), path.join(publicDir, file.path), constants.COPYFILE_EXCL);
  const successfulIdentity = await inventory(publicDir);
  report.representative = { entries: representative.entries.length, assets: representative.assets.length, contentTypes: [...types], measured_requests: representative.requests, totalBodyBytes: representative.requests.reduce((sum, request) => sum + request.bodyBytes, 0), independent_expected_chrome: representative.expected, receipt: result.privateEvidence.receipt, immutable_input_sha256: before, public_files: successfulIdentity };
  await jsonFile(path.join(privateDir, 'representative-manifest.json'), representative.options.manifest);
  await jsonFile(path.join(privateDir, 'representative-receipt.json'), result.privateEvidence.receipt);
  pass('Complete prebound synthetic population; actual acquisition/normalization; independent chrome, navigation and social order');
  pass('One neutral nonindexable document; original notice; no client/bootstrap/private serialization; emitted referenced CSS');
  const controlsDir = path.join(output, 'verification-attempts'); await mkdir(controlsDir);
  const authored = 'Mock <script>alert("authored")</script> & \'quoted\'';
  const authoredLink = 'Links <b> & "authored"';
  const control = scenario(fixtures, authored, authoredLink), controlBefore = inputIdentity(control);
  const escaped = await renderDeliveryDocument(control.options, styles);
  need(escaped.ok && isDeepStrictEqual(escaped.privateEvidence.chrome, control.expected), 'ADVERSARIAL_NORMALIZATION');
  inspectHTML(escaped.html, control.expected, styles, css);
  need(escaped.html.includes(escapeHTML(authored)) && escaped.html.includes(escapeHTML(authoredLink)) && !escaped.html.includes('<script>') && inputIdentity(control) === controlBefore, 'AUTHORED_ESCAPING');
  const escapingDir = path.join(controlsDir, 'escaping-control'); await mkdir(escapingDir);
  await writeFile(path.join(escapingDir, 'control.html'), escaped.html, { flag: 'wx' });
  await jsonFile(path.join(escapingDir, 'report.json'), { status: 'PASS', scope: 'CONTROL_ONLY; not a second representative document', expectedAuthoredSiteName: authored, expectedAuthoredNavigationLabel: authoredLink, immutable_input_sha256: controlBefore });
  pass('Adversarial authored strings use independently expected escaped text; inputs preserved');
  const helper = path.join(toolsDir, 'negative-render-' + path.basename(output) + '.mjs');
  const childSource = [
    "import { readFile } from 'node:fs/promises';",
    "import { pathToFileURL } from 'node:url';",
    "const data = JSON.parse(await readFile(process.argv[2], 'utf8'));",
    "const { renderDeliveryDocument } = await import(pathToFileURL(data.bundle).href);",
    "const context = {...data.context, policy:{...data.context.policy, reviewedAccessibility:new Map(data.context.policy.reviewedAccessibility), employmentPrecision:new Map(data.context.policy.employmentPrecision)}, revisionFacts:new Map(data.context.revisionFacts)};",
    "const transport = async () => { if(data.scenario === 'rejected-transport') throw new Error(data.marker); return {status:401,redirected:false,finalTarget:data.target,body:new Uint8Array()}; };",
    "const result = await renderDeliveryDocument({manifest:data.manifest, context, credentialMarker:data.marker, transport},data.styles);",
    "if(result.ok) {process.stdout.write(JSON.stringify({ok:true,unexpected_success:true})+'\\n');process.exitCode=0;} else {process.stdout.write(JSON.stringify(result)+'\\n');process.exitCode=1;}",
  ].join('\n') + '\n';
  await writeFile(helper, childSource, { flag: 'wx' });
  report.negative_children = [];
  for (const name of ['mock-401', 'rejected-transport']) {
    const directory = path.join(controlsDir, name); await mkdir(directory);
    const input = path.join(directory, 'private-input.json');
    await jsonFile(input, { bundle: path.join(rendererDir, 'entry.mjs'), scenario: name, marker, target, manifest: representative.options.manifest, context: contextJSON(representative.options.context), styles });
    const attempt = { kind: 'EXPECTED_NEGATIVE_CHILD', scenario: name, command: [process.execPath, helper, input], cwd: workspace, started_utc: new Date().toISOString(), timeout_ms: 30000 };
    const child = spawnSync(process.execPath, [helper, input], { cwd: workspace, env: process.env, encoding: 'utf8', timeout: 30000 });
    Object.assign(attempt, { completed_utc: new Date().toISOString(), exit_code: child.status, signal: child.signal, stdout: child.stdout, stderr: child.stderr, spawn_error_code: child.error?.code ?? null });
    await jsonFile(path.join(directory, 'command-attempt.json'), attempt);
    report.command_attempts.push(attempt);
    need(!child.error && child.status === 1 && child.signal === null && child.stderr === '', 'NEGATIVE_NONZERO_RESULT_REQUIRED');
    const safe = JSON.parse(child.stdout);
    need(!safe.ok && isDeepStrictEqual(Object.keys(safe).sort(), ['error', 'ok']) && isDeepStrictEqual(Object.keys(safe.error), ['code']) && /^[A-Z][A-Z0-9_]+$/.test(safe.error.code), 'SANITIZED_FAILURE_SHAPE');
    need(safe.error.code === (name === 'mock-401' ? 'HTTP_STATUS' : 'TRANSPORT_REJECTED'), 'SPECIFIC_ACQUISITION_FAILURE');
    need(!child.stdout.includes(marker) && !child.stdout.includes('html') && !child.stdout.includes('COMPLETE'), 'FAILED_ACQUISITION_LEAK_OR_FALLBACK');
    await jsonFile(path.join(directory, 'safe-result.json'), safe);
    report.negative_children.push({ scenario: name, actual_exit_code: child.status, result: safe, status: 'PASS' });
  }
  need(isDeepStrictEqual(await inventory(publicDir), successfulIdentity), 'SUCCESS_CHANGED_AFTER_FAILURES');
  need((await inventory(publicDir)).filter(file => file.path.endsWith('.html')).length === 1, 'ONE_REPRESENTATIVE_DOCUMENT');
  pass('Actual nonzero safe failure children; no partial HTML/fallback; earlier successful artifacts preserved');
  const publicIdentity = await inventory(publicDir);
  report.output_members = (await inventory(output)).map(file => ({ ...file, category: file.path.startsWith('public/') ? 'PUBLIC_NEUTRAL_VERIFICATION_ARTIFACT' : 'PRIVATE_VERIFICATION_ONLY' }));
  report.public_identity = publicIdentity;
  report.status = 'PASS';
} catch (error) {
  report.status = 'FAIL';
  report.safe_code = error instanceof Error && /^[A-Z][A-Z0-9_]+$/.test(error.message) ? error.message : 'SSR_VERIFICATION_FAILED';
  process.exitCode = 1;
} finally {
  report.completed_utc = new Date().toISOString();
  if (reportWritable) {
    const reportPath = path.join(output, 'verification-report.json');
    if (!await exists(reportPath)) await jsonFile(reportPath, report);
  }
  process.stdout.write(JSON.stringify({ status: report.status, safe_code: report.safe_code, report: output ? path.join(output, 'verification-report.json') : null, checks: checks.length }) + '\n');
}
