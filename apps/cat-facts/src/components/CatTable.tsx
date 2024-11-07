import { catFactsZodiosHooks, schemas } from '@my-monorepo-demo/cat-facts-zodios';
import { PaginationState, useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

const fallbackData: Array<Zod.infer<typeof schemas.Breed>> = [];
const columnHelper = createColumnHelper<Zod.infer<typeof schemas.Breed>>();
const columns = [
  columnHelper.accessor((row) => row.breed, {
    id: 'Breed',
  }),
  columnHelper.accessor((row) => row.country, {
    header: 'Country',
  }),
  columnHelper.accessor((row) => row.origin, {
    header: 'Origin',
  }),
  columnHelper.accessor((row) => row.coat, {
    header: 'Coat',
  }),
  columnHelper.accessor((row) => row.pattern, {
    header: 'Pattern',
  }),
];

export const CatTable = () => {

  const startPage = 1;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: startPage,
    pageSize: 10,
  });

  const { data, isError, error, refetch } = catFactsZodiosHooks.useGetBreeds({
    queries: {
      limit: pagination.pageSize,
      page: pagination.pageIndex,
    },
  });

  const breeds = data?.data || [];

  const table = useReactTable({
    columns,
    data: breeds ?? fallbackData,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    rowCount: data?.total,
    manualPagination: true,
    state: {
      pagination,
    },
  });

  const currentPage = pagination.pageIndex;
  const rowsOnPage = breeds.length;
  const pageSize = pagination.pageSize;
  const totalPages = Math.ceil((data?.total ?? 0) / pageSize);
  const totalRows = data?.total ?? 0;
  const startIndex = currentPage * pageSize - pageSize;
  const endIndex = startIndex + rowsOnPage;

  if (isError) {
    return (
      <>
        <div>Error: {error.message}</div>
        <button onClick={() => refetch()}>Retry</button>
      </>
    );
  }
  return (
    <>
      <table className="w-full text-left table-auto min-w-max text-slate-800">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="text-slate-500 border-b border-slate-300 bg-slate-50"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr
              key={footerGroup.id}
              className="text-slate-500 border-t border-slate-300 bg-slate-50"
            >
              {footerGroup.headers.map((header) => (
                <th key={header.id} className="p-4">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-sm text-slate-500">
          Showing{' '}
          <b>
            {startIndex + 1}-{endIndex}
          </b>{' '}
          of {totalRows}
        </div>
        <div className="flex space-x-1">
          {pagination.pageIndex > startPage && (
            <button
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: pagination.pageIndex - 1,
                })
              }
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
            >
              Prev
            </button>
          )}
          {pagination.pageIndex < totalPages && (
            <button
              onClick={() =>
                setPagination({
                  ...pagination,
                  pageIndex: pagination.pageIndex + 1,
                })
              }
              className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
