import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { Button } from '../../ui/Button';
import { StatusLabel, type StatusLabelStatus } from '../../ui/StatusLabel';
import { Tag } from '../../ui/Tag';
import { Text } from '../../ui/Text';
import {
  actions as actionsClass,
  content,
  contentFrame,
  densities,
  empty,
  header,
  inner,
  meta,
  note,
  root,
  utilityActions,
  utilityBar,
  utilityButton,
  utilityIdentity,
  utilityKicker,
  utilityLabel,
} from './DemoPageShell.css';

export type DemoPageShellDensity = 'compact' | 'default' | 'spacious';
export type DemoPageShellStatus = 'planned' | 'implemented' | 'review' | 'deprecated';
export type DemoPageShellTheme = 'light' | 'dark';

export type DemoPageShellProps = {
  title: ReactNode;
  description?: ReactNode;
  phase?: ReactNode;
  category?: ReactNode;
  status?: DemoPageShellStatus;
  tags?: string[];
  actions?: ReactNode;
  children?: ReactNode;
  density?: DemoPageShellDensity;
  framed?: boolean;
  emptyMessage?: ReactNode;
  showUtilityBar?: boolean;
  projectLabel?: ReactNode;
  githubHref?: string;
  linkedInHref?: string;
  initialTheme?: DemoPageShellTheme;
  theme?: DemoPageShellTheme;
  onThemeToggle?: () => void;
  className?: string;
  contentClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'title'>;

function getStatusTone(status: DemoPageShellStatus): StatusLabelStatus {
  if (status === 'implemented') return 'success';
  if (status === 'review') return 'info';
  if (status === 'deprecated') return 'warning';
  return 'neutral';
}

export function DemoPageShell({
  title,
  description,
  phase,
  category,
  status = 'implemented',
  tags = [],
  actions,
  children,
  density = 'default',
  framed = false,
  emptyMessage = 'No demo content has been added yet.',
  showUtilityBar = true,
  projectLabel = 'UI Roadmap / Demo System',
  githubHref = 'https://github.com/gah-code',
  linkedInHref = 'https://www.linkedin.com/in/gilberto-haro-2b108222b/',
  initialTheme = 'light',
  theme,
  onThemeToggle,
  className,
  contentClassName,
  ...rest
}: DemoPageShellProps) {
  const [internalTheme, setInternalTheme] = useState<DemoPageShellTheme>(initialTheme);
  const activeTheme = theme ?? internalTheme;
  const hasMeta = Boolean(phase || category || status || tags.length > 0);
  const hasChildren = children !== undefined && children !== null;
  const nextTheme = activeTheme === 'light' ? 'dark' : 'light';

  function handleThemeToggle() {
    onThemeToggle?.();

    if (theme === undefined) {
      setInternalTheme(nextTheme);
    }
  }

  return (
    <section
      {...rest}
      className={[root, className].filter(Boolean).join(' ')}
      data-theme={activeTheme}
    >
      <div className={[inner, densities[density]].join(' ')}>
        {showUtilityBar ? (
          <div className={utilityBar}>
            <div className={utilityIdentity}>
              <div className={utilityLabel}>{projectLabel}</div>
              <p className={utilityKicker}>App-side demos backed by Storybook system coverage.</p>
            </div>

            <div className={utilityActions} aria-label="Demo shell utility actions" role="group">
              <Button
                aria-label="View GitHub profile"
                className={utilityButton}
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
                className={utilityButton}
                href={linkedInHref}
                rel="noreferrer"
                size="sm"
                target="_blank"
                variant="ghost"
              >
                LinkedIn
              </Button>
              <Button
                aria-label={
                  activeTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
                }
                aria-pressed={activeTheme === 'dark'}
                className={utilityButton}
                onClick={handleThemeToggle}
                size="sm"
                type="button"
                variant="secondary"
              >
                {activeTheme === 'light' ? 'Dark mode' : 'Light mode'}
              </Button>
            </div>
          </div>
        ) : null}

        <div className={header}>
          {hasMeta ? (
            <div className={meta}>
              {status ? <StatusLabel status={getStatusTone(status)}>{status}</StatusLabel> : null}
              {phase ? <Tag variant="brand">{phase}</Tag> : null}
              {category ? <Tag>{category}</Tag> : null}
              {tags.map((tag) => (
                <Tag key={tag} size="sm">
                  {tag}
                </Tag>
              ))}
            </div>
          ) : null}

          <Text as="h1" variant="display">
            {title}
          </Text>

          {description ? (
            <Text as="p" variant="subheading" tone="secondary">
              {description}
            </Text>
          ) : null}

          {actions ? <div className={actionsClass}>{actions}</div> : null}
        </div>

        <div
          className={[content, framed ? contentFrame : undefined, contentClassName]
            .filter(Boolean)
            .join(' ')}
        >
          {hasChildren ? (
            children
          ) : (
            <div className={empty}>
              <Text as="p" variant="body" tone="muted">
                {emptyMessage}
              </Text>
            </div>
          )}
        </div>

        <div className={note}>
          <Text as="p" variant="caption" tone="secondary">
            DemoPageShell is an app-side demo frame. Storybook remains the primary design-system
            workspace for component states and API validation.
          </Text>
        </div>
      </div>
    </section>
  );
}
