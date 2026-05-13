import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { Button } from '../../ui/Button';
import {
  action,
  actions,
  description as descriptionClass,
  identity,
  inner,
  label as labelClass,
  root,
} from './GalleryBeaconBar.css';

export type GalleryBeaconBarTheme = 'light' | 'dark';

export type GalleryBeaconBarProps = {
  label?: ReactNode;
  description?: ReactNode;
  githubHref?: string;
  linkedInHref?: string;
  theme?: GalleryBeaconBarTheme;
  onThemeToggle?: () => void;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function GalleryBeaconBar({
  label = 'UI Roadmap / Demo System',
  description = 'App-side gallery backed by Storybook system coverage.',
  githubHref = 'https://github.com/gah-code',
  linkedInHref = 'https://www.linkedin.com/in/gilberto-haro-2b108222b/',
  theme,
  onThemeToggle,
  className,
  ...rest
}: GalleryBeaconBarProps) {
  const [internalTheme, setInternalTheme] = useState<GalleryBeaconBarTheme>('light');
  const activeTheme = theme ?? internalTheme;
  const nextTheme = activeTheme === 'light' ? 'dark' : 'light';

  function handleThemeToggle() {
    onThemeToggle?.();

    if (theme === undefined) {
      setInternalTheme(nextTheme);
    }
  }

  return (
    <div
      {...rest}
      className={[root, className].filter(Boolean).join(' ')}
      data-theme={activeTheme}
    >
      <div className={inner}>
        <div className={identity}>
          <p className={labelClass}>{label}</p>
          <p className={descriptionClass}>{description}</p>
        </div>

        <div className={actions} aria-label="Gallery beacon actions" role="group">
          <Button
            aria-label="View GitHub profile"
            className={action}
            href={githubHref}
            rel="noreferrer"
            size="sm"
            target="_blank"
            variant="ghost"
          >
            GitHub
          </Button>
          <Button
            aria-label="View LinkedIn profile"
            className={action}
            href={linkedInHref}
            rel="noreferrer"
            size="sm"
            target="_blank"
            variant="ghost"
          >
            LinkedIn
          </Button>
          <Button
            aria-label={activeTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            aria-pressed={activeTheme === 'dark'}
            className={action}
            onClick={handleThemeToggle}
            size="sm"
            type="button"
            variant="secondary"
          >
            {activeTheme === 'light' ? 'Dark mode' : 'Light mode'}
          </Button>
        </div>
      </div>
    </div>
  );
}
