import { useState, type HTMLAttributes } from 'react';
import { Button } from '../../ui/Button';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import { GalleryBeaconBar } from '../GalleryBeaconBar';
import { GalleryCategoryBrowser } from '../GalleryCategoryBrowser';
import { GalleryIndex } from '../GalleryIndex';
import {
  divider,
  hintText,
  navigationHint,
  root,
  stack,
  surface,
} from './GallerySurfaceLayout.css';

export type GallerySurfaceTheme = 'light' | 'dark';

export type GallerySurfaceLayoutProps = {
  showNavigationHint?: boolean;
  initialTheme?: GallerySurfaceTheme;
  theme?: GallerySurfaceTheme;
  onThemeToggle?: () => void;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function GallerySurfaceLayout({
  showNavigationHint = true,
  initialTheme = 'light',
  theme,
  onThemeToggle,
  className,
  ...rest
}: GallerySurfaceLayoutProps) {
  const [internalTheme, setInternalTheme] = useState<GallerySurfaceTheme>(initialTheme);
  const activeTheme = theme ?? internalTheme;
  const nextTheme = activeTheme === 'light' ? 'dark' : 'light';

  function handleThemeToggle() {
    onThemeToggle?.();

    if (theme === undefined) {
      setInternalTheme(nextTheme);
    }
  }

  return (
    <main
      {...rest}
      className={[root, className].filter(Boolean).join(' ')}
      data-theme={activeTheme}
    >
      <GalleryBeaconBar theme={activeTheme} onThemeToggle={handleThemeToggle} />

      {showNavigationHint ? (
        <nav className={navigationHint} aria-label="Gallery surface navigation">
          <Tag variant="brand">Gallery flow</Tag>
          <Text as="span" variant="caption" tone="secondary" className={hintText}>
            Browse the system overview, then inspect each category below.
          </Text>
          <Button href="#gallery-categories" variant="link" size="sm">
            Jump to categories
          </Button>
        </nav>
      ) : null}

      <div className={stack}>
        <div className={surface}>
          <GalleryIndex />
        </div>

        <div className={divider} aria-hidden="true" />

        <div id="gallery-categories" className={surface}>
          <GalleryCategoryBrowser />
        </div>
      </div>
    </main>
  );
}
