export type GalleryCategory =
  | 'foundation'
  | 'primitive'
  | 'pattern'
  | 'component'
  | 'section';

export type GalleryStatus =
  | 'planned'
  | 'implemented'
  | 'review'
  | 'deprecated';

export type GalleryItem = {
  id: string;
  title: string;
  category: GalleryCategory;
  status: GalleryStatus;
  description: string;
  phase: string;
  path?: string;
  storybook?: string;
  tags?: string[];
  notes?: string;
};

export type GalleryCategorySummary = {
  id: GalleryCategory;
  title: string;
  description: string;
};
