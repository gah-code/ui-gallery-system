import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import {
  actions as actionsClass,
  densities,
  fullWidth,
  gaps,
  layouts,
  lead as leadClass,
  root,
  support as supportClass,
} from './FPattern.css';

export type FPatternGap = 'sm' | 'md' | 'lg' | 'xl';
export type FPatternDensity = 'comfortable' | 'compact' | 'spacious';
export type FPatternLayout = 'default' | 'withRail' | 'wideLead';

export type FPatternProps = {
  as?: ElementType;
  lead: ReactNode;
  support?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  gap?: FPatternGap;
  density?: FPatternDensity;
  layout?: FPatternLayout;
  className?: string;
  leadClassName?: string;
  supportClassName?: string;
  actionsClassName?: string;
  footerClassName?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'content'>;

export function FPattern({
  as: Component = 'div',
  lead,
  support,
  actions,
  footer,
  gap = 'lg',
  density = 'comfortable',
  layout = 'default',
  className,
  leadClassName,
  supportClassName,
  actionsClassName,
  footerClassName,
  ...rest
}: FPatternProps) {
  const classes = [root, support ? layouts[layout] : undefined, gaps[gap], densities[density], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...rest}>
      <div className={[leadClass, leadClassName].filter(Boolean).join(' ')}>
        {lead}
        {actions ? (
          <div className={[actionsClass, actionsClassName].filter(Boolean).join(' ')}>{actions}</div>
        ) : null}
      </div>

      {support ? (
        <div className={[supportClass, supportClassName].filter(Boolean).join(' ')}>{support}</div>
      ) : null}

      {footer ? <div className={[fullWidth, footerClassName].filter(Boolean).join(' ')}>{footer}</div> : null}
    </Component>
  );
}
