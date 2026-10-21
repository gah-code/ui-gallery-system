import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

function boundaryManifest(): Plugin {
  return {name:'portfolio-boundary-manifest', generateBundle(_, bundle) {
    const chunks = Object.values(bundle).filter(b => b.type === 'chunk').map(b => ({file:b.fileName,imports:b.imports,dynamicImports:b.dynamicImports,modules:Object.keys(b.modules).sort()}));
    this.emitFile({type:'asset',fileName:'boundary-manifest.json',source:JSON.stringify(chunks,null,2)});
  }};
}
export default defineConfig(({isSsrBuild}) => ({
  envDir:false, publicDir:false, cacheDir:'dist-portfolio-build/vite-cache',
  plugins:[vanillaExtractPlugin(),react(),boundaryManifest()],
  build:{sourcemap:false,assetsInlineLimit:0,emptyOutDir:false,manifest:true,ssrEmitAssets:true,
    rollupOptions:{input:isSsrBuild ? 'src/portfolio/entry-server.tsx' : 'src/portfolio/entry-client.tsx',output:{entryFileNames:isSsrBuild ? 'entry-server.js' : 'assets/[name]-[hash].js',assetFileNames:'assets/[name]-[hash][extname]'}}},
}));
