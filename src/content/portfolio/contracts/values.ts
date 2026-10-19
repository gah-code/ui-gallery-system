// Compile-time vocabulary only. Version unassigned until 06.2 approval.
declare const valueBrand: unique symbol;
export type Value<Name extends string> =
  string & { readonly [valueBrand]: Name };
export type Id = Value<'Id'>;
export type Text = Value<'Text'>;
export type NonEmptyText = Value<'NonEmptyText'>;
export type Slug = Value<'Slug'>;
export type HttpsUrl = Value<'HttpsUrl'>;
export type Email = Value<'Email'>;
export type MailtoUrl = Value<'MailtoUrl'>;
export type FixtureAssetPath = Value<'FixtureAssetPath'>;
export type AssetUrl = HttpsUrl | FixtureAssetPath;
export type NonEmpty<T> = readonly [T, ...T[]];
export type Empty = readonly [];
export type StaticRouteKey =
  'home' | 'about' | 'work' | 'projects' | 'writing' | 'tools' | 'contact';
export type StaticPath = '/' | '/about' | '/work' | '/projects'
  | '/writing' | '/tools' | '/contact';
export type ProjectPath = `/projects/${Slug}`;
export type ArticlePath = `/writing/${Slug}`;
export type Path = StaticPath | ProjectPath | ArticlePath;
export type Audience = 'PUBLIC' | 'TRUSTED_PREVIEW';


declare const numberBrand: unique symbol;
export type Integer = number & { readonly [numberBrand]: 'Integer' };
export type PositiveInteger = number & { readonly [numberBrand]: 'PositiveInteger' };
export type NonNegativeInteger = number & { readonly [numberBrand]: 'NonNegativeInteger' };
export type DiagnosticCode =
  | 'SITE_MISSING' | 'PROFILE_MISSING' | 'SINGLETON_AMBIGUOUS'
  | 'HOME_NOT_READY' | 'CONTACT_UNAVAILABLE' | 'COLLECTION_EMPTY'
  | 'ROUTE_NOT_FOUND' | 'SLUG_AMBIGUOUS' | 'REQUIRED_FIELD' | 'SOURCE_TYPE'
  | 'LOCALE_MISMATCH' | 'SOURCE_UNAVAILABLE' | 'SOURCE_INVALID'
  | 'SOURCE_REFERENCE_ERROR' | 'REFERENCE_KIND' | 'REFERENCE_TYPE'
  | 'REFERENCE_MISSING' | 'REFERENCE_CARDINALITY' | 'TARGET_INELIGIBLE'
  | 'SELF_REFERENCE' | 'RELATED_CYCLE' | 'RT_NODE' | 'RT_MARK' | 'RT_LINK'
  | 'RT_EMPTY' | 'RT_STRUCTURE' | 'UNSUPPORTED_MARK' | 'UNSUPPORTED_MEDIA'
  | 'MEDIA_INVALID' | 'DATE_CONFLICT' | 'DATE_INVALID' | 'SITE_POLICY_INVALID'
  | 'WHOI_OPTIONAL_EMPTY' | 'CONTENT_UNAVAILABLE' | 'MEDIA_UNAVAILABLE';
