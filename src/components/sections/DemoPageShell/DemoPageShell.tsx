import type { HTMLAttributes, ReactNode } from 'react';
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
} from './DemoPageShell.css';

export type DemoPageShellDensity = 'compact' | 'default' | 'spacious';
export type DemoPageShellStatus = 'planned' | 'implemented' | 'review' | 'deprecated';

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
  className,
  contentClassName,
  ...rest
}: DemoPageShellProps) {
  const hasMeta = Boolean(phase || category || status || tags.length > 0);
  const hasChildren = children !== undefined && children !== null;

  return (
    <section className={[root, className].filter(Boolean).join(' ')} {...rest}>
      <div className={[inner, densities[density]].join(' ')}>
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
