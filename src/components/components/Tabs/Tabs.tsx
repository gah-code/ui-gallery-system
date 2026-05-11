import {
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { panel, panelDensities, root, tab, tabDensities, tabList, tones } from './Tabs.css';

export type TabsDensity = 'compact' | 'default' | 'spacious';
export type TabsTone = 'default' | 'subtle' | 'outline';

export type TabItem = {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  density?: TabsDensity;
  tone?: TabsTone;
  defaultSelectedId?: string;
  selectedId?: string;
  onSelectedChange?: (id: string) => void;
  className?: string;
  tabListClassName?: string;
  tabClassName?: string;
  panelClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

function getSafeId(id: string) {
  return id.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function getFirstEnabledId(items: TabItem[]) {
  return items.find((item) => !item.disabled)?.id;
}

export function Tabs({
  items,
  density = 'default',
  tone = 'default',
  defaultSelectedId,
  selectedId,
  onSelectedChange,
  className,
  tabListClassName,
  tabClassName,
  panelClassName,
  ...rest
}: TabsProps) {
  const baseId = useId();
  const firstEnabledId = useMemo(() => getFirstEnabledId(items), [items]);
  const defaultItemIsEnabled = items.some(
    (item) => item.id === defaultSelectedId && !item.disabled,
  );
  const [internalSelectedId, setInternalSelectedId] = useState(
    defaultItemIsEnabled ? defaultSelectedId : firstEnabledId,
  );

  if (items.length === 0 || !firstEnabledId) {
    return null;
  }

  const requestedActiveId = selectedId ?? internalSelectedId ?? firstEnabledId;
  const activeItem =
    items.find((item) => item.id === requestedActiveId && !item.disabled) ??
    items.find((item) => !item.disabled);
  const activeId = activeItem?.id ?? firstEnabledId;

  function selectTab(id: string, disabled?: boolean) {
    if (disabled) return;

    if (selectedId === undefined) {
      setInternalSelectedId(id);
    }

    onSelectedChange?.(id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }

    event.preventDefault();

    const enabledItems = items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.disabled);
    const enabledIndex = enabledItems.findIndex(({ index }) => index === currentIndex);

    if (enabledIndex === -1) return;

    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextEnabled =
      enabledItems[(enabledIndex + direction + enabledItems.length) % enabledItems.length];

    selectTab(nextEnabled.item.id, nextEnabled.item.disabled);

    const nextButton = document.getElementById(`${baseId}-${getSafeId(nextEnabled.item.id)}-tab`);
    nextButton?.focus();
  }

  return (
    <div className={[root, tones[tone], className].filter(Boolean).join(' ')} {...rest}>
      <div
        className={[tabList, tabListClassName].filter(Boolean).join(' ')}
        role="tablist"
        aria-orientation="horizontal"
      >
        {items.map((item, index) => {
          const safeId = getSafeId(item.id);
          const isSelected = item.id === activeId;
          const tabId = `${baseId}-${safeId}-tab`;
          const panelId = `${baseId}-${safeId}-panel`;

          return (
            <button
              id={tabId}
              key={item.id}
              className={[tab, tabDensities[density], tabClassName].filter(Boolean).join(' ')}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => selectTab(item.id, item.disabled)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const safeId = getSafeId(item.id);
        const isSelected = item.id === activeId;
        const tabId = `${baseId}-${safeId}-tab`;
        const panelId = `${baseId}-${safeId}-panel`;

        return (
          <div
            id={panelId}
            key={item.id}
            className={[panel, panelDensities[density], panelClassName]
              .filter(Boolean)
              .join(' ')}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!isSelected}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
}
