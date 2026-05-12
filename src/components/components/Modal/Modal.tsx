import {
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { Text } from '../../ui/Text';
import {
  backdrop,
  body,
  closeButton,
  dialog,
  footer as footerClass,
  header,
  sizes,
  titleArea,
  tones,
} from './Modal.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ModalTone = 'default' | 'subtle';

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  tone?: ModalTone;
  closeLabel?: string;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  initialFocusRef?: RefObject<HTMLElement | null>;
  className?: string;
  dialogClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  tone = 'default',
  closeLabel = 'Close dialog',
  closeOnEscape = true,
  closeOnBackdrop = true,
  initialFocusRef,
  className,
  dialogClassName,
  bodyClassName,
  footerClassName,
  onKeyDown: onDialogKeyDown,
  ...rest
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const focusTarget =
      initialFocusRef?.current ??
      dialogRef.current?.querySelector<HTMLElement>(focusableSelector) ??
      dialogRef.current;

    focusTarget?.focus();

    return () => {
      previousFocusRef.current?.focus?.();
    };
  }, [initialFocusRef, open]);

  if (!open) {
    return null;
  }

  function close() {
    onOpenChange(false);
  }

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (!closeOnBackdrop) {
      return;
    }

    if (event.target === event.currentTarget) {
      close();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onDialogKeyDown?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'Escape' && closeOnEscape) {
      event.stopPropagation();
      close();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const dialogNode = dialogRef.current;

    if (!dialogNode) {
      return;
    }

    const focusableElements = Array.from(
      dialogNode.querySelectorAll<HTMLElement>(focusableSelector),
    ).filter((element) => !element.hasAttribute('disabled'));

    if (focusableElements.length === 0) {
      event.preventDefault();
      dialogNode.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      className={[backdrop, className].filter(Boolean).join(' ')}
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className={[dialog, sizes[size], tones[tone], dialogClassName].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        {...rest}
        onKeyDown={handleKeyDown}
      >
        <div className={header}>
          <div className={titleArea}>
            <Text id={titleId} as="h2" variant="heading">
              {title}
            </Text>
            {description ? (
              <Text id={descriptionId} as="p" variant="body" tone="secondary">
                {description}
              </Text>
            ) : null}
          </div>

          <button className={closeButton} type="button" aria-label={closeLabel} onClick={close}>
            x
          </button>
        </div>

        <div className={[body, bodyClassName].filter(Boolean).join(' ')}>{children}</div>

        {footer ? (
          <div className={[footerClass, footerClassName].filter(Boolean).join(' ')}>
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
