import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Text } from '../../ui/Text';
import {
  indicator,
  indicatorOpen,
  item as itemClass,
  panel,
  panelDensities,
  root,
  title as titleClass,
  tones,
  trigger,
  triggerDensities,
} from './Accordion.css';

export type AccordionDensity = 'compact' | 'default' | 'spacious';
export type AccordionTone = 'default' | 'subtle' | 'outline';

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type AccordionProps = {
  items: AccordionItem[];
  density?: AccordionDensity;
  tone?: AccordionTone;
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
  className?: string;
  itemClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

function normalizeDefaultOpenItems(defaultOpenItems: string[], allowMultiple: boolean) {
  return allowMultiple ? defaultOpenItems : defaultOpenItems.slice(0, 1);
}

function getSafeId(id: string) {
  return id.replace(/[^a-zA-Z0-9_-]/g, '-');
}

export function Accordion({
  items,
  density = 'default',
  tone = 'default',
  allowMultiple = false,
  defaultOpenItems = [],
  className,
  itemClassName,
  ...rest
}: AccordionProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<string[]>(() =>
    normalizeDefaultOpenItems(defaultOpenItems, allowMultiple),
  );

  if (items.length === 0) {
    return null;
  }

  function toggleItem(id: string, disabled?: boolean) {
    if (disabled) return;

    setOpenItems((current) => {
      const isOpen = current.includes(id);

      if (allowMultiple) {
        return isOpen ? current.filter((entry) => entry !== id) : [...current, id];
      }

      return isOpen ? [] : [id];
    });
  }

  return (
    <div className={[root, tones[tone], className].filter(Boolean).join(' ')} {...rest}>
      {items.map((entry) => {
        const isOpen = openItems.includes(entry.id);
        const safeId = getSafeId(entry.id);
        const triggerId = `${baseId}-${safeId}-trigger`;
        const panelId = `${baseId}-${safeId}-panel`;

        return (
          <div className={[itemClass, itemClassName].filter(Boolean).join(' ')} key={entry.id}>
            <button
              id={triggerId}
              className={[trigger, triggerDensities[density]].join(' ')}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={entry.disabled}
              onClick={() => toggleItem(entry.id, entry.disabled)}
            >
              <span className={titleClass}>
                <Text as="span" variant="label">
                  {entry.title}
                </Text>
              </span>
              <span
                className={[indicator, isOpen ? indicatorOpen : undefined]
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden="true"
              >
                v
              </span>
            </button>

            <div
              id={panelId}
              className={[panel, panelDensities[density]].join(' ')}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
            >
              {entry.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
