'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UITable,
} from '@/components/ui/table';
import {
  AccessorColumnDef,
  DisplayColumnDef,
  GroupColumnDef,
  RowData,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { DataTablePagination } from './components/Pagination';

export type TableColumn<TData extends RowData, TValue = unknown> =
  | DisplayColumnDef<TData, TValue>
  | GroupColumnDef<TData, TValue>
  | (AccessorColumnDef<TData, TValue> & {
      width?: number;
    });

interface TableProps<TData, TValue> {
  columns: TableColumn<TData, TValue>[];
  data: TData[];
  rowSelection?: boolean;
  className?: string;
  pagination?: false;
}

export function Table<TData, TValue>({
  columns,
  data,
  rowSelection: propsRowSelection,
  className,
  pagination,
}: TableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns: propsRowSelection
      ? [
          {
            id: 'select',
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value: any) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            ),
          },
          ...(columns || []),
        ]
      : columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
    },
  });

  return (
    <div className={className}>
      <div className="rounded-md border">
        <UITable className="min-w-max">
          <colgroup>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header: any, index) => {
                return (
                  <col
                    data-key={`${headerGroup.id}.${header.id}.${index}`}
                    key={`${headerGroup.id}.${header.id}.${index}`}
                    style={{ width: header.column.columnDef.width }}
                  />
                );
              }),
            )}
          </colgroup>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={`${headerGroup.id}.${header.id}.${index}`}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={`${row.id}.${index}`}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={`${cell.id}.${index}`}
                      data-key={`${cell.id}.${index}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
      {pagination !== false && (
        <div className="mt-4">
          <DataTablePagination rowSelection={propsRowSelection} table={table} />
        </div>
      )}
    </div>
  );
}
