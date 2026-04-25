import {
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
  useId,
} from 'react';
import {
  control,
  errorText as errorTextClass,
  field,
  helperText as helperTextClass,
  invalid,
  label as labelClass,
  requiredMark,
  sizes,
  textarea as textareaClass,
} from './Input.css';

export type InputSize = 'sm' | 'md' | 'lg';

type SharedInputProps = {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  size?: InputSize;
  multiline?: boolean;
  controlClassName?: string;
};

type NativeInputProps = SharedInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    multiline?: false;
  };

type NativeTextareaProps = SharedInputProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
  };

export type InputProps = NativeInputProps | NativeTextareaProps;

export function Input({
  id,
  label,
  helperText,
  error,
  size = 'md',
  multiline = false,
  className,
  controlClassName,
  required,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const helperId = helperText ? `${controlId}-helper` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;
  const fieldClasses = [field, className].filter(Boolean).join(' ');
  const controlClasses = [
    control,
    sizes[size],
    multiline ? textareaClass : undefined,
    error ? invalid : undefined,
    controlClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={fieldClasses}>
      {label ? (
        <label className={labelClass} htmlFor={controlId}>
          {label}
          {required ? (
            <>
              {' '}
              <span className={requiredMark} aria-hidden="true">
                *
              </span>
            </>
          ) : null}
        </label>
      ) : null}

      {multiline ? (
        <textarea
          id={controlId}
          className={controlClasses}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          required={required}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={controlId}
          className={controlClasses}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          required={required}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {helperText ? (
        <p id={helperId} className={helperTextClass}>
          {helperText}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className={errorTextClass}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
