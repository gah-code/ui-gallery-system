import { useMemo, useState, type HTMLAttributes } from 'react';
import {
  galleryCategories,
  getGalleryItemsByCategory,
  type GalleryCategory,
  type GalleryStatus,
} from '../../../data/gallery';
import { Button } from '../../ui/Button';
import { StatusLabel, type StatusLabelStatus } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  categoryHeader,
  categoryMeta,
  categorySummary,
  controls,
  header,
  inner,
  itemCard,
  itemGrid,
  itemHeader,
  itemMeta,
  note,
  pathText,
  root,
  tagList,
} from './GalleryCategoryBrowser.css';

export type GalleryCategoryBrowserProps = {
  title?: string;
  description?: string;
  defaultCategory?: GalleryCategory;
  className?: string;
} & HTMLAttributes<HTMLElement>;

function getStatusTone(status: GalleryStatus): StatusLabelStatus {
  if (status === 'implemented') return 'success';
  if (status === 'review') return 'info';
  if (status === 'deprecated') return 'warning';
  return 'neutral';
}

export function GalleryCategoryBrowser({
  title = 'Browse UI System Categories',
  description = 'Explore the implemented system pieces by category. This view is metadata-driven and intentionally lightweight.',
  defaultCategory,
  className,
  ...rest
}: GalleryCategoryBrowserProps) {
  const initialCategory = defaultCategory ?? galleryCategories[0]?.id ?? 'foundation';
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>(initialCategory);

  const selectedCategorySummary = galleryCategories.find(
    (category) => category.id === selectedCategory,
  );

  const selectedItems = useMemo(
    () => getGalleryItemsByCategory(selectedCategory),
    [selectedCategory],
  );

  const implementedItems = selectedItems.filter((item) => item.status === 'implemented');

  return (
    <section className={[root, className].filter(Boolean).join(' ')} {...rest}>
      <div className={inner}>
        <div className={header}>
          <Tag variant="brand">Category browsing</Tag>
          <Text as="h1" variant="display">
            {title}
          </Text>
          <Text as="p" variant="subheading" tone="secondary">
            {description}
          </Text>
        </div>

        <div className={controls} aria-label="Gallery categories">
          {galleryCategories.map((category) => {
            const selected = category.id === selectedCategory;

            return (
              <Button
                aria-pressed={selected}
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
                type="button"
                variant={selected ? 'primary' : 'secondary'}
              >
                {category.title}
              </Button>
            );
          })}
        </div>

        {selectedCategorySummary ? (
          <div className={categorySummary}>
            <div className={categoryHeader}>
              <Text as="h2" variant="heading">
                {selectedCategorySummary.title}
              </Text>
              <Text as="p" variant="body" tone="secondary">
                {selectedCategorySummary.description}
              </Text>
            </div>

            <div className={categoryMeta}>
              <StatusLabel status="info">{selectedItems.length} items</StatusLabel>
              <StatusLabel status="success">
                {implementedItems.length} implemented
              </StatusLabel>
            </div>
          </div>
        ) : null}

        <div className={itemGrid}>
          {selectedItems.map((item) => (
            <article className={itemCard} key={item.id}>
              <div className={itemHeader}>
                <Text as="h3" variant="heading">
                  {item.title}
                </Text>
                <Text as="p" variant="body" tone="secondary">
                  {item.description}
                </Text>
              </div>

              <div className={itemMeta}>
                <StatusLabel status={getStatusTone(item.status)}>{item.status}</StatusLabel>
                <Tag variant="brand">{item.phase}</Tag>
              </div>

              {item.path ? (
                <Text as="p" variant="caption" tone="muted" className={pathText}>
                  Path: {item.path}
                </Text>
              ) : null}

              {item.storybook ? (
                <Text as="p" variant="caption" tone="muted" className={pathText}>
                  Storybook: {item.storybook}
                </Text>
              ) : null}

              {item.tags && item.tags.length > 0 ? (
                <div className={tagList}>
                  {item.tags.map((tag) => (
                    <Tag key={tag} size="sm">
                      {tag}
                    </Tag>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className={note}>
          <Text as="p" variant="body" tone="secondary">
            Category browsing is intentionally simple in this phase. Advanced search,
            route-level category pages, and demo pages are deferred.
          </Text>
        </div>
      </div>
    </section>
  );
}
