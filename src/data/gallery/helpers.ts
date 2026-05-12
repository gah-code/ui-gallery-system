import { galleryItems } from './items';
import type { GalleryCategory, GalleryItem } from './types';

export function getGalleryItemsByCategory(category: GalleryCategory): GalleryItem[] {
  return galleryItems.filter((item) => item.category === category);
}

export function getImplementedGalleryItems(): GalleryItem[] {
  return galleryItems.filter((item) => item.status === 'implemented');
}

export function getGalleryItemById(id: string): GalleryItem | undefined {
  return galleryItems.find((item) => item.id === id);
}

export function getGalleryItemsByPhase(phase: string): GalleryItem[] {
  return galleryItems.filter((item) => item.phase === phase);
}

export function getGalleryItemsByTag(tag: string): GalleryItem[] {
  return galleryItems.filter((item) => item.tags?.includes(tag));
}
