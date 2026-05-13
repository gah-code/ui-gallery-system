import type { HTMLAttributes } from 'react';
import {
  galleryCategories,
  galleryItems,
  getGalleryItemsByCategory,
} from '../../../data/gallery';
import { StatusLabel } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  categories,
  categoryCard,
  categoryHeader,
  categoryMeta,
  header,
  inner,
  itemPreview,
  itemPreviewList,
  note,
  remaining,
  root,
  summary,
  summaryItem,
  textMuted,
  textPrimary,
} from './GalleryIndex.css';

export type GalleryIndexProps = {
  title?: string;
  description?: string;
  previewItemLimit?: number;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function GalleryIndex({
  title = 'UI Gallery System',
  description = 'Browse the completed foundations, primitives, layout patterns, reusable components, and section components that make up this UI system.',
  previewItemLimit = 5,
  className,
  ...rest
}: GalleryIndexProps) {
  const implementedItems = galleryItems.filter((item) => item.status === 'implemented');
  const totalItems = galleryItems.length;
  const categoryCount = galleryCategories.length;

  return (
    <section className={[root, className].filter(Boolean).join(' ')} {...rest}>
      <div className={inner}>
        <div className={header}>
          <Tag variant="brand">Phase 6</Tag>
          <Text as="h1" variant="display" className={textPrimary}>
            {title}
          </Text>
          <Text as="p" variant="subheading" tone="secondary" className={textMuted}>
            {description}
          </Text>
        </div>

        <div className={summary} aria-label="Gallery summary">
          <div className={summaryItem}>
            <Text as="p" variant="metadata" tone="muted" className={textMuted}>
              Total items
            </Text>
            <Text as="p" variant="heading" className={textPrimary}>
              {totalItems}
            </Text>
          </div>

          <div className={summaryItem}>
            <Text as="p" variant="metadata" tone="muted" className={textMuted}>
              Implemented
            </Text>
            <Text as="p" variant="heading" className={textPrimary}>
              {implementedItems.length}
            </Text>
          </div>

          <div className={summaryItem}>
            <Text as="p" variant="metadata" tone="muted" className={textMuted}>
              Categories
            </Text>
            <Text as="p" variant="heading" className={textPrimary}>
              {categoryCount}
            </Text>
          </div>
        </div>

        <div className={categories}>
          {galleryCategories.map((category) => {
            const items = getGalleryItemsByCategory(category.id);
            const implemented = items.filter((item) => item.status === 'implemented');
            const previewItems = items.slice(0, previewItemLimit);
            const remainingCount = Math.max(items.length - previewItems.length, 0);

            return (
              <article className={categoryCard} key={category.id}>
                <div className={categoryHeader}>
                  <Text as="h2" variant="heading" className={textPrimary}>
                    {category.title}
                  </Text>
                  <Text as="p" variant="body" tone="secondary" className={textMuted}>
                    {category.description}
                  </Text>
                </div>

                <div className={categoryMeta}>
                  <StatusLabel status="info" size="sm">
                    {items.length} items
                  </StatusLabel>
                  <StatusLabel status="success" size="sm">
                    {implemented.length} implemented
                  </StatusLabel>
                </div>

                <ul className={itemPreviewList} aria-label={`${category.title} preview items`}>
                  {previewItems.map((item) => (
                    <li className={itemPreview} key={item.id}>
                      <Text as="span" variant="caption" tone="secondary" className={textMuted}>
                        {item.title}
                      </Text>
                    </li>
                  ))}
                </ul>

                {remainingCount > 0 ? (
                  <Text
                    as="p"
                    variant="caption"
                    tone="muted"
                    className={[remaining, textMuted].join(' ')}
                  >
                    +{remainingCount} more in this category
                  </Text>
                ) : null}
              </article>
            );
          })}
        </div>

        <div className={note}>
          <Text as="p" variant="body" tone="secondary" className={textMuted}>
            This gallery is an app-side browsing surface. Storybook remains the primary
            design-system workspace for detailed component states, API validation, and
            interaction coverage.
          </Text>
        </div>
      </div>
    </section>
  );
}
