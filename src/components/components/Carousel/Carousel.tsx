import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { Icon } from '../../ui/Icon';
import { Text } from '../../ui/Text';
import {
  control,
  controls,
  footer,
  gaps,
  header,
  headingGroup,
  itemWidths,
  root,
  slide,
  track,
  viewport,
} from './Carousel.css';

export type CarouselGap = 'sm' | 'md' | 'lg' | 'xl';
export type CarouselItemsPerView = 'auto' | 'one' | 'two' | 'three';

export type CarouselItem = {
  id?: string;
  content: ReactNode;
  label?: string;
};

export type CarouselProps = {
  items: CarouselItem[];
  label?: string;
  description?: ReactNode;
  gap?: CarouselGap;
  itemsPerView?: CarouselItemsPerView;
  initialIndex?: number;
  previousLabel?: string;
  nextLabel?: string;
  showControls?: boolean;
  showStatus?: boolean;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  slideClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'children'>;

function clampIndex(index: number, itemCount: number) {
  return Math.min(Math.max(index, 0), Math.max(itemCount - 1, 0));
}

function getScrollBehavior(): ScrollBehavior {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return 'auto';
  }

  return 'smooth';
}

export function Carousel({
  items,
  label = 'Carousel',
  description,
  gap = 'md',
  itemsPerView = 'one',
  initialIndex = 0,
  previousLabel = 'Previous slide',
  nextLabel = 'Next slide',
  showControls = true,
  showStatus = true,
  className,
  viewportClassName,
  trackClassName,
  slideClassName,
  ...rest
}: CarouselProps) {
  const headingId = useId();
  const safeInitialIndex = clampIndex(initialIndex, items.length);
  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndex = clampIndex(currentIndex, items.length);

  useEffect(() => {
    slideRefs.current[activeIndex]?.scrollIntoView({
      behavior: getScrollBehavior(),
      block: 'nearest',
      inline: 'start',
    });
  }, [activeIndex]);

  if (items.length === 0) {
    return null;
  }

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === items.length - 1;

  function goToPrevious() {
    setCurrentIndex((current) => Math.max(clampIndex(current, items.length) - 1, 0));
  }

  function goToNext() {
    setCurrentIndex((current) => Math.min(clampIndex(current, items.length) + 1, items.length - 1));
  }

  function handleViewportKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  }

  return (
    <section
      className={[root, className].filter(Boolean).join(' ')}
      aria-labelledby={headingId}
      {...rest}
    >
      <div className={header}>
        <div className={headingGroup}>
          <Text id={headingId} as="h3" variant="heading">
            {label}
          </Text>
          {description ? (
            <Text as="p" variant="caption" tone="secondary">
              {description}
            </Text>
          ) : null}
        </div>

        {showControls ? (
          <div className={controls} aria-label={`${label} controls`}>
            <button
              className={control}
              type="button"
              onClick={goToPrevious}
              disabled={isFirst}
              aria-label={previousLabel}
            >
              <Icon decorative size="md">
                ‹
              </Icon>
            </button>
            <button
              className={control}
              type="button"
              onClick={goToNext}
              disabled={isLast}
              aria-label={nextLabel}
            >
              <Icon decorative size="md">
                ›
              </Icon>
            </button>
          </div>
        ) : null}
      </div>

      <div
        className={[viewport, viewportClassName].filter(Boolean).join(' ')}
        tabIndex={0}
        aria-label={`${label} items`}
        onKeyDown={handleViewportKeyDown}
      >
        <div
          className={[track, gaps[gap], itemWidths[itemsPerView], trackClassName]
            .filter(Boolean)
            .join(' ')}
        >
          {items.map((item, index) => (
            <div
              className={[slide, slideClassName].filter(Boolean).join(' ')}
              key={item.id ?? index}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={item.label ?? `Slide ${index + 1} of ${items.length}`}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {showStatus ? (
        <div className={footer} aria-live="polite">
          <span>
            Slide {activeIndex + 1} of {items.length}
          </span>
        </div>
      ) : null}
    </section>
  );
}
