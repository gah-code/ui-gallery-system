import type { HTMLAttributes, ReactNode } from 'react';
import { Text } from '../../ui/Text';
import {
  alignments,
  bodyCell,
  caption as captionClass,
  cellBase,
  cellContent,
  densities,
  empty as emptyClass,
  header,
  headerCell,
  head,
  root,
  row as rowClass,
  stripedRow,
  table as tableClass,
  tones,
  viewport,
} from './Tables.css';

export type TableDensity = 'compact' | 'default' | 'spacious';
export type TableTone = 'default' | 'subtle' | 'outline';
export type TableAlign = 'start' | 'center' | 'end';

export type TableRow = Record<string, ReactNode>;

export type TableColumn<RowData extends TableRow = TableRow> = {
  id: string;
  header: ReactNode;
  accessor?: keyof RowData;
  render?: (row: RowData, rowIndex: number) => ReactNode;
  align?: TableAlign;
};

export type TablesProps<RowData extends TableRow = TableRow> = {
  columns: Array<TableColumn<RowData>>;
  rows: RowData[];
  title?: ReactNode;
  description?: ReactNode;
  caption?: ReactNode;
  density?: TableDensity;
  tone?: TableTone;
  striped?: boolean;
  emptyMessage?: ReactNode;
  className?: string;
  tableClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Tables<RowData extends TableRow = TableRow>({
  columns,
  rows,
  title,
  description,
  caption,
  density = 'default',
  tone = 'default',
  striped = false,
  emptyMessage = 'No data available.',
  className,
  tableClassName,
  ...rest
}: TablesProps<RowData>) {
  const hasRows = rows.length > 0;

  return (
    <div className={[root, className].filter(Boolean).join(' ')} {...rest}>
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

      <div className={[viewport, tones[tone]].join(' ')}>
        <table className={[tableClass, tableClassName].filter(Boolean).join(' ')}>
          {caption ? <caption className={captionClass}>{caption}</caption> : null}

          <thead className={head}>
            <tr>
              {columns.map((column) => (
                <th
                  className={[
                    cellBase,
                    headerCell,
                    densities[density],
                    alignments[column.align ?? 'start'],
                  ].join(' ')}
                  key={column.id}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hasRows ? (
              rows.map((entry, rowIndex) => (
                <tr
                  className={[rowClass, striped ? stripedRow : undefined]
                    .filter(Boolean)
                    .join(' ')}
                  key={rowIndex}
                >
                  {columns.map((column) => {
                    const value = column.render
                      ? column.render(entry, rowIndex)
                      : column.accessor
                        ? entry[column.accessor]
                        : entry[column.id];

                    return (
                      <td
                        className={[
                          cellBase,
                          bodyCell,
                          densities[density],
                          alignments[column.align ?? 'start'],
                        ].join(' ')}
                        key={column.id}
                      >
                        <span className={cellContent}>{value}</span>
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td className={emptyClass} colSpan={columns.length || 1}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
