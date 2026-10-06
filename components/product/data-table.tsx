"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Columns3, Download, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/product/modal";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  /** Value used for sorting. Omit to make the column unsortable. */
  sort?: (row: T) => string | number;
  /** Plain value used for CSV export. */
  csv?: (row: T) => string | number;
  align?: "right";
  hidden?: boolean;
};

export type FilterDef<T> = {
  key: string;
  label: string;
  options: { value: string; label: string }[];
  test: (row: T, value: string) => boolean;
};

export type BulkAction = { label: string; confirm: (n: number) => string; done: (n: number) => string };

type Props<T> = {
  rows: T[];
  columns: Column<T>[];
  getId: (row: T) => string;
  search: (row: T) => string;
  searchPlaceholder: string;
  noun: string; // plural, e.g. "students"
  exportName: string;
  filters?: FilterDef<T>[];
  initialFilters?: Record<string, string>;
  initialQuery?: string;
  bulkActions?: BulkAction[];
  onRowOpen?: (row: T) => void;
  pageSize?: number;
};

const controlClass = "h-9 rounded-md border border-border-strong bg-surface px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25";

export function DataTable<T>({ rows, columns, getId, search, searchPlaceholder, noun, exportName, filters = [], initialFilters = {}, initialQuery = "", bulkActions = [], onRowOpen, pageSize: initialPageSize = 10 }: Props<T>) {
  const [q, setQ] = useState(initialQuery);
  const [active, setActive] = useState<Record<string, string>>(initialFilters);
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hiddenCols, setHiddenCols] = useState<Set<string>>(new Set(columns.filter((c) => c.hidden).map((c) => c.key)));
  const [pending, setPending] = useState<BulkAction | null>(null);

  const visible = columns.filter((c) => !hiddenCols.has(c.key));

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = rows.filter((r) => (!needle || search(r).toLowerCase().includes(needle)) && filters.every((f) => !active[f.key] || f.test(r, active[f.key])));
    if (sort) {
      const col = columns.find((c) => c.key === sort.key);
      if (col?.sort) out = [...out].sort((a, b) => {
        const x = col.sort!(a), y = col.sort!(b);
        return (typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), undefined, { numeric: true })) * sort.dir;
      });
    }
    return out;
  }, [rows, q, active, sort, columns, filters, search]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages - 1);
  const slice = filtered.slice(current * pageSize, current * pageSize + pageSize);
  const pageIds = slice.map(getId);
  const allOnPage = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const filterCount = Object.values(active).filter(Boolean).length + (q ? 1 : 0);

  const reset = () => { setPage(0); setSelected(new Set()); };
  const toggleSort = (key: string) => {
    setSort((s) => (s?.key !== key ? { key, dir: 1 } : s.dir === 1 ? { key, dir: -1 } : null));
    setPage(0);
  };
  const toggleRow = (id: string) => setSelected((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  const exportCsv = () => {
    const cols = visible.filter((c) => c.csv);
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const body = [cols.map((c) => esc(c.header)).join(","), ...filtered.map((r) => cols.map((c) => esc(c.csv!(r))).join(","))].join("\n");
    const url = URL.createObjectURL(new Blob([body], { type: "text/csv;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `${exportName}.csv` });
    a.click();
    URL.revokeObjectURL(url);
    toast(`Exported ${filtered.length} ${noun} to CSV`);
  };

  return (
    <div className="panel overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b p-3">
        <div role="search" className="relative min-w-0 flex-1 basis-56">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <label htmlFor={`${exportName}-q`} className="sr-only">{searchPlaceholder}</label>
          <input id={`${exportName}-q`} value={q} onChange={(e) => { setQ(e.target.value); reset(); }} placeholder={searchPlaceholder} className={cn(controlClass, "w-full pl-8")} />
        </div>
        {filters.map((f) => (
          <label key={f.key} className="flex items-center gap-1.5 text-sm">
            <span className="sr-only">{f.label}</span>
            <select value={active[f.key] ?? ""} onChange={(e) => { setActive((a) => ({ ...a, [f.key]: e.target.value })); reset(); }} className={cn(controlClass, active[f.key] && "border-primary bg-primary-soft font-medium text-primary")}>
              <option value="">{f.label}: all</option>
              {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
        ))}
        {filterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={() => { setQ(""); setActive({}); reset(); }}><X /> Clear</Button>
        )}
        <div className="ml-auto flex items-center gap-2">
          <details className="relative">
            <summary className="flex h-9 cursor-pointer list-none items-center gap-1.5 rounded-md border border-border-strong bg-surface px-2.5 text-sm font-medium hover:bg-muted [&::-webkit-details-marker]:hidden">
              <Columns3 className="size-4" aria-hidden /> Columns
            </summary>
            <div className="panel absolute right-0 z-20 mt-1 w-52 p-2 shadow-md">
              {columns.map((c) => (
                <label key={c.key} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-muted">
                  <input type="checkbox" checked={!hiddenCols.has(c.key)} onChange={() => setHiddenCols((s) => { const n = new Set(s); if (n.has(c.key)) n.delete(c.key); else n.add(c.key); return n; })} className="size-4 accent-[var(--primary)]" />
                  {c.header}
                </label>
              ))}
            </div>
          </details>
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={filtered.length === 0}><Download /> Export</Button>
        </div>
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-b bg-primary-soft px-3 py-2 text-sm" role="region" aria-label="Bulk actions">
          <span className="font-semibold text-primary">{selected.size} selected</span>
          {allOnPage && filtered.length > slice.length && selected.size < filtered.length && (
            <button type="button" className="font-semibold text-primary underline underline-offset-2" onClick={() => setSelected(new Set(filtered.map(getId)))}>Select all {filtered.length}</button>
          )}
          <span className="ml-auto flex flex-wrap items-center gap-2">
            {bulkActions.map((a) => <Button key={a.label} size="sm" onClick={() => setPending(a)}>{a.label}</Button>)}
            <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>Clear selection</Button>
          </span>
        </div>
      )}

      {/* Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
              {bulkActions.length > 0 && (
                <th scope="col" className="w-10 px-3 py-2.5">
                  <input type="checkbox" aria-label="Select all on this page" checked={allOnPage} onChange={() => setSelected((s) => { const n = new Set(s); pageIds.forEach((id) => (allOnPage ? n.delete(id) : n.add(id))); return n; })} className="size-4 accent-[var(--primary)]" />
                </th>
              )}
              {visible.map((c) => {
                const dir = sort?.key === c.key ? sort.dir : 0;
                return (
                  <th key={c.key} scope="col" aria-sort={dir === 1 ? "ascending" : dir === -1 ? "descending" : undefined} className={cn("px-3 py-2.5 font-semibold", c.align === "right" && "text-right")}>
                    {c.sort ? (
                      <button type="button" onClick={() => toggleSort(c.key)} className="inline-flex items-center gap-1 uppercase tracking-wide hover:text-foreground">
                        {c.header}
                        {dir === 1 ? <ArrowUp className="size-3" aria-hidden /> : dir === -1 ? <ArrowDown className="size-3" aria-hidden /> : <ArrowUpDown className="size-3 opacity-40" aria-hidden />}
                      </button>
                    ) : c.header}
                  </th>
                );
              })}
              {onRowOpen && <th scope="col" className="w-16 px-3 py-2.5"><span className="sr-only">Actions</span></th>}
            </tr>
          </thead>
          <tbody>
            {slice.map((r) => {
              const id = getId(r);
              const on = selected.has(id);
              return (
                <tr key={id} onClick={() => onRowOpen?.(r)} className={cn("border-b last:border-b-0", onRowOpen && "cursor-pointer", on ? "bg-primary-soft/60" : "hover:bg-muted/50")}>
                  {bulkActions.length > 0 && (
                    <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" aria-label={`Select ${id}`} checked={on} onChange={() => toggleRow(id)} className="size-4 accent-[var(--primary)]" />
                    </td>
                  )}
                  {visible.map((c) => <td key={c.key} className={cn("px-3 py-2.5", c.align === "right" && "tnum text-right")}>{c.cell(r)}</td>)}
                  {onRowOpen && (
                    <td className="px-3 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button type="button" onClick={() => onRowOpen(r)} className="rounded-md px-2 py-1 text-sm font-semibold text-primary hover:bg-primary-soft">View</button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="font-semibold">No {noun} match these filters</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search, or clear the filters.</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={() => { setQ(""); setActive({}); reset(); }}>Clear filters</Button>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t px-3 py-2.5 text-sm">
        <p className="text-muted-foreground" aria-live="polite">
          {filtered.length === 0 ? `0 ${noun}` : `${current * pageSize + 1} to ${Math.min(filtered.length, (current + 1) * pageSize)} of ${filtered.length} ${noun}`}
        </p>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-muted-foreground">
            Rows
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); reset(); }} className={cn(controlClass, "h-8")}>
              {[10, 25, 50].map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <Button variant="outline" size="icon" className="size-8" aria-label="Previous page" disabled={current === 0} onClick={() => setPage(current - 1)}><ChevronLeft /></Button>
          <span className="tnum min-w-16 text-center text-muted-foreground">{current + 1} / {pages}</span>
          <Button variant="outline" size="icon" className="size-8" aria-label="Next page" disabled={current >= pages - 1} onClick={() => setPage(current + 1)}><ChevronRight /></Button>
        </div>
      </div>

      <Modal
        open={!!pending}
        onClose={() => setPending(null)}
        title={pending?.label ?? ""}
        description={pending?.confirm(selected.size)}
        footer={
          <>
            <Button variant="outline" onClick={() => setPending(null)}>Cancel</Button>
            <Button onClick={() => { if (pending) toast(pending.done(selected.size)); setPending(null); setSelected(new Set()); }}>Confirm</Button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">This is a prototype: no message is actually sent.</p>
      </Modal>
    </div>
  );
}
