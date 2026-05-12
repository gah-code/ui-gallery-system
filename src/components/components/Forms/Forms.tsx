import type { FormHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { Text } from '../../ui/Text';
import { Alert, type AlertVariant } from '../Alert';
import {
  actions as actionsClass,
  densities,
  field as fieldClass,
  fieldGaps,
  fieldset as fieldsetClass,
  fields as fieldsClass,
  footer as footerClass,
  fullWidthField,
  header,
  inlineField,
  layouts,
  root,
  status as statusClass,
  tones,
} from './Forms.css';

export type FormsLayout = 'stacked' | 'grid' | 'inline';
export type FormsDensity = 'compact' | 'default' | 'spacious';
export type FormsTone = 'default' | 'subtle' | 'outline';
export type FormsElement = 'form' | 'div' | 'section';

export type FormField = {
  id: string;
  node: ReactNode;
  fullWidth?: boolean;
};

export type FormStatus = {
  variant?: AlertVariant;
  title?: ReactNode;
  message: ReactNode;
};

type BaseFormsProps = {
  as?: FormsElement;
  title?: ReactNode;
  description?: ReactNode;
  fields: FormField[];
  actions?: ReactNode;
  status?: FormStatus;
  footer?: ReactNode;
  layout?: FormsLayout;
  density?: FormsDensity;
  tone?: FormsTone;
  disabled?: boolean;
  className?: string;
  fieldsClassName?: string;
  actionsClassName?: string;
};

export type FormsProps = BaseFormsProps &
  (
    | ({ as?: 'form' } & Omit<FormHTMLAttributes<HTMLFormElement>, 'title'>)
    | ({ as: 'div' | 'section' } & Omit<HTMLAttributes<HTMLElement>, 'title'>)
  );

export function Forms({
  as: Component = 'form',
  title,
  description,
  fields,
  actions,
  status,
  footer,
  layout = 'stacked',
  density = 'default',
  tone = 'default',
  disabled = false,
  className,
  fieldsClassName,
  actionsClassName,
  ...rest
}: FormsProps) {
  const content = (
    <>
      {title || description ? (
        <div className={header}>
          {title ? (
            <Text as="h3" variant="heading">
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text as="p" variant="body" tone="secondary">
              {description}
            </Text>
          ) : null}
        </div>
      ) : null}

      {status ? (
        <div className={statusClass}>
          <Alert variant={status.variant ?? 'info'}>
            {status.title ? (
              <Text as="p" variant="label">
                {status.title}
              </Text>
            ) : null}
            <Text as="div" variant="body" tone="secondary">
              {status.message}
            </Text>
          </Alert>
        </div>
      ) : null}

      <div
        className={[fieldsClass, layouts[layout], fieldGaps[density], fieldsClassName]
          .filter(Boolean)
          .join(' ')}
      >
        {fields.map((formField) => (
          <div
            className={[
              fieldClass,
              layout === 'inline' ? inlineField : undefined,
              formField.fullWidth ? fullWidthField : undefined,
            ]
              .filter(Boolean)
              .join(' ')}
            key={formField.id}
          >
            {formField.node}
          </div>
        ))}
      </div>

      {actions ? (
        <div className={[actionsClass, actionsClassName].filter(Boolean).join(' ')}>
          {actions}
        </div>
      ) : null}

      {footer ? (
        <Text as="p" variant="caption" tone="muted" className={footerClass}>
          {footer}
        </Text>
      ) : null}
    </>
  );

  const classes = [root, tones[tone], densities[density], className].filter(Boolean).join(' ');

  if (Component === 'form') {
    const formRest = rest as Omit<FormHTMLAttributes<HTMLFormElement>, 'title'>;

    return (
      <form className={classes} {...formRest}>
        <fieldset className={fieldsetClass} disabled={disabled}>
          {content}
        </fieldset>
      </form>
    );
  }

  const containerRest = rest as Omit<HTMLAttributes<HTMLElement>, 'title'>;

  return (
    <Component className={classes} aria-disabled={disabled ? true : undefined} {...containerRest}>
      {content}
    </Component>
  );
}
