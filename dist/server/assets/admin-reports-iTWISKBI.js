import { jsx, jsxs } from "react/jsx-runtime";
import { useLoaderData } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Users, Building2, BriefcaseBusiness, ReceiptText, Wallet, Clock3, TrendingUp, Search, SlidersHorizontal, Loader2, ShieldCheck } from "lucide-react";
import { A as AppShell } from "./router-CCfZqKWO.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { I as Input } from "./input-C0QjszdI.js";
import { P as Popover, b as PopoverTrigger, a as PopoverContent } from "./popover-Cx-UuE1R.js";
import { R as ReportExportActions } from "./ReportExportActions-BC1o5kJ9.js";
import "@tanstack/react-query";
import "./server-B8npIiGW.js";
import "../server.js";
import "node:crypto";
import "node:fs/promises";
import "node:path";
import "zod";
import "better-sqlite3";
import "nodemailer";
import "node:async_hooks";
import "h3-v2";
import "jsdom";
import "dompurify";
import "socket.io-client";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "react-redux";
import "sonner";
import "@reduxjs/toolkit";
import "./badge-DyfXZgLs.js";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@hookform/resolvers/zod";
import "react-hook-form";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "./select-DPaGlibP.js";
import "@radix-ui/react-select";
import "./client-profile-B1xUUnTZ.js";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slider";
import "./forgot-password-D1FDXg_D.js";
import "@radix-ui/react-accordion";
import "@radix-ui/react-switch";
import "@radix-ui/react-popover";
function AdminReportsPage() {
  const data = useLoaderData({
    from: "/admin-reports"
  });
  const displayName = `${data.viewer?.firstName || ""} ${data.viewer?.lastName || ""}`.trim() || data.viewer?.email || "Admin";
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [rowLoading, setRowLoading] = useState(false);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    search: "",
    status: "",
    category: "",
    userType: "",
    paymentStatus: "",
    jobStatus: ""
  });
  async function parseBackendJson(response) {
    const result = await response.json();
    return result?.data ?? result;
  }
  useEffect(() => {
    void loadTables();
  }, []);
  useEffect(() => {
    void loadSummary();
  }, [filters.from, filters.to]);
  useEffect(() => {
    if (!selectedTable) return;
    const timer = window.setTimeout(() => {
      void loadRows(1);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [selectedTable, pageSize, filters.from, filters.to, filters.search, filters.status, filters.category, filters.userType, filters.paymentStatus, filters.jobStatus]);
  async function loadTables() {
    setTableLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/reports/tables");
      if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
      const result = await parseBackendJson(res);
      if (result?.status === "connected") {
        const nextTables = Array.isArray(result.tables) ? result.tables : [];
        setTables(nextTables);
        if (!selectedTable && nextTables[0]) {
          setSelectedTable(nextTables[0].name);
        }
      } else {
        setError(result?.error || "The reports database is currently unavailable.");
      }
    } catch (err) {
      setError(`Unable to load report tables: ${err.message}`);
    } finally {
      setTableLoading(false);
    }
  }
  async function loadSummary() {
    setSummaryLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.from) params.set("from", filters.from);
      if (filters.to) params.set("to", filters.to);
      const res = await fetch(`/api/v1/reports/summary${params.toString() ? `?${params.toString()}` : ""}`);
      if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
      const result = await parseBackendJson(res);
      setSummary(result);
    } catch (err) {
      setError((current) => current ?? `Unable to load summary cards: ${err.message}`);
    } finally {
      setSummaryLoading(false);
    }
  }
  async function loadRows(pageNumber = 1) {
    if (!selectedTable) return;
    setRowLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/reports/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          table: selectedTable,
          page: pageNumber,
          pageSize,
          filters: {
            from: filters.from,
            to: filters.to,
            search: filters.search,
            status: filters.status,
            category: filters.category,
            userType: filters.userType,
            paymentStatus: filters.paymentStatus,
            jobStatus: filters.jobStatus
          }
        })
      });
      if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
      const result = await parseBackendJson(res);
      setColumns(result.columns || []);
      setRows(result.rows || []);
      setTotalRows(result.total || 0);
      setPage(result.page || pageNumber);
    } catch (err) {
      setError(`Unable to load rows: ${err.message}`);
    } finally {
      setRowLoading(false);
    }
  }
  function printReport() {
    if (!selectedTable) return;
    const reportRows = sortedRows.map((row) => {
      return columns.map((column) => `${column}: ${String(row[column] ?? "")}`).join(" | ");
    });
    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) return;
    printWindow.document.write(`<!doctype html><html><head><title>${selectedTable} report</title><style>body{font-family:Arial,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;font-size:12px}th{background:#f8fafc}</style></head><body><h1>${selectedTable} report</h1><p>Generated on ${(/* @__PURE__ */ new Date()).toLocaleString()}</p><table><thead><tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr></thead><tbody>${reportRows.map((row) => `<tr><td>${row.replace(/\|/g, "</td><td>")}</td></tr>`).join("")}</tbody></table></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
  const pageCount = Math.max(1, Math.ceil(totalRows / pageSize));
  useMemo(() => summary?.charts?.monthlyUsers || [], [summary]);
  useMemo(() => summary?.charts?.monthlyEarnings || [], [summary]);
  useMemo(() => summary?.charts?.jobsByStatus || [], [summary]);
  useMemo(() => summary?.charts?.paymentsByStatus || [], [summary]);
  useMemo(() => summary?.charts?.categoryDistribution || [], [summary]);
  const sortedRows = useMemo(() => {
    if (!sortColumn) return rows;
    const copy = [...rows];
    copy.sort((left, right) => {
      const a = left[sortColumn];
      const b = right[sortColumn];
      if (typeof a === "number" && typeof b === "number") {
        return sortDirection === "asc" ? a - b : b - a;
      }
      const leftValue = String(a ?? "");
      const rightValue = String(b ?? "");
      return sortDirection === "asc" ? leftValue.localeCompare(rightValue) : rightValue.localeCompare(leftValue);
    });
    return copy;
  }, [rows, sortColumn, sortDirection]);
  function toggleSort(column) {
    if (sortColumn === column) {
      setSortDirection((current) => current === "asc" ? "desc" : "asc");
      return;
    }
    setSortColumn(column);
    setSortDirection("asc");
  }
  return /* @__PURE__ */ jsx(AppShell, { title: "Admin Reports", userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer?.email ?? void 0, children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-50 px-4 py-8 lg:px-8", children: [
    error ? /* @__PURE__ */ jsx("div", { className: "mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700", children: error }) : null,
    summaryLoading ? /* @__PURE__ */ jsx("div", { className: "mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: Array.from({
      length: 4
    }).map((_, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "h-4 w-24 animate-pulse rounded bg-slate-200" }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 h-8 w-20 animate-pulse rounded bg-slate-100" })
    ] }, index)) }) : summary?.cards?.length ? /* @__PURE__ */ jsx("div", { className: "mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4", children: summary.cards.map((card, index) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-slate-600", children: card.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-semibold text-slate-900", children: card.value.toLocaleString() })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "rounded-full bg-slate-100 p-2 text-slate-700", children: card.icon === "Users" ? /* @__PURE__ */ jsx(Users, { className: "h-4 w-4" }) : card.icon === "Building2" ? /* @__PURE__ */ jsx(Building2, { className: "h-4 w-4" }) : card.icon === "BriefcaseBusiness" ? /* @__PURE__ */ jsx(BriefcaseBusiness, { className: "h-4 w-4" }) : card.icon === "ReceiptText" ? /* @__PURE__ */ jsx(ReceiptText, { className: "h-4 w-4" }) : card.icon === "Wallet" ? /* @__PURE__ */ jsx(Wallet, { className: "h-4 w-4" }) : card.icon === "Clock3" ? /* @__PURE__ */ jsx(Clock3, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-slate-500", children: card.subtitle })
    ] }, `${card.title}-${index}`)) }) : null,
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-900", children: "Report builder" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Choose a table, apply filters, and export." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2", children: /* @__PURE__ */ jsx(ReportExportActions, { table: selectedTable, reportName: `${selectedTable}-report`, filters, onPrint: printReport }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-slate-200 bg-slate-50 p-3", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500", children: "Table" }),
          /* @__PURE__ */ jsxs("select", { value: selectedTable, onChange: (event) => {
            setSelectedTable(event.target.value);
            setPage(1);
          }, className: "w-full h-8 rounded-md border border-slate-300 bg-white px-2 py-0 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary", children: [
            tableLoading ? /* @__PURE__ */ jsx("option", { value: "", children: "Loading..." }) : null,
            tables.map((table) => /* @__PURE__ */ jsx("option", { value: table.name, children: table.label || table.name }, table.name))
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500", children: "Search" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" }),
            /* @__PURE__ */ jsx(Input, { value: filters.search, onChange: (event) => setFilters((current) => ({
              ...current,
              search: event.target.value
            })), placeholder: "Search...", className: "h-8 pl-8 text-sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500", children: "Date From" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: filters.from, onChange: (event) => setFilters((current) => ({
            ...current,
            from: event.target.value
          })), className: "h-8 text-sm px-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-500", children: "Date To" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: filters.to, onChange: (event) => setFilters((current) => ({
            ...current,
            to: event.target.value
          })), className: "h-8 text-sm px-2" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-start-4 flex justify-end items-end", children: /* @__PURE__ */ jsxs(Popover, { children: [
          /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "h-8 w-full lg:w-auto", children: [
            /* @__PURE__ */ jsx(SlidersHorizontal, { className: "mr-2 h-3.5 w-3.5" }),
            "More Filters"
          ] }) }),
          /* @__PURE__ */ jsx(PopoverContent, { className: "w-80 p-4", align: "end", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-slate-500", children: "Additional Filters" }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-semibold text-slate-500", children: "Status" }),
                /* @__PURE__ */ jsx(Input, { value: filters.status, onChange: (event) => setFilters((current) => ({
                  ...current,
                  status: event.target.value
                })), placeholder: "OPEN, DRAFT...", className: "h-8 text-sm" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-semibold text-slate-500", children: "Category" }),
                /* @__PURE__ */ jsx(Input, { value: filters.category, onChange: (event) => setFilters((current) => ({
                  ...current,
                  category: event.target.value
                })), placeholder: "Category", className: "h-8 text-sm" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-semibold text-slate-500", children: "User Type" }),
                /* @__PURE__ */ jsx(Input, { value: filters.userType, onChange: (event) => setFilters((current) => ({
                  ...current,
                  userType: event.target.value
                })), placeholder: "CLIENT / PROFESSIONAL", className: "h-8 text-sm" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-semibold text-slate-500", children: "Payment Status" }),
                /* @__PURE__ */ jsx(Input, { value: filters.paymentStatus, onChange: (event) => setFilters((current) => ({
                  ...current,
                  paymentStatus: event.target.value
                })), placeholder: "COMPLETED", className: "h-8 text-sm" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[10px] font-semibold text-slate-500", children: "Job Status" }),
                /* @__PURE__ */ jsx(Input, { value: filters.jobStatus, onChange: (event) => setFilters((current) => ({
                  ...current,
                  jobStatus: event.target.value
                })), placeholder: "OPEN / CLOSED", className: "h-8 text-sm" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "sm", className: "mt-1", onClick: () => setFilters({
              from: filters.from,
              to: filters.to,
              search: filters.search,
              status: "",
              category: "",
              userType: "",
              paymentStatus: "",
              jobStatus: ""
            }), children: "Clear Extra Filters" })
          ] }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 overflow-hidden rounded-2xl border border-slate-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-slate-900", children: selectedTable || "No table selected" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-slate-500", children: [
              totalRows,
              " rows • Page ",
              page,
              " of ",
              pageCount
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("select", { value: pageSize, onChange: (event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
            }, className: "rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700", children: [10, 25, 50].map((size) => /* @__PURE__ */ jsxs("option", { value: size, children: [
              size,
              "/page"
            ] }, size)) }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: () => loadRows(Math.max(1, page - 1)), disabled: rowLoading || page <= 1, children: "Prev" }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: () => loadRows(Math.min(pageCount, page + 1)), disabled: rowLoading || page >= pageCount, children: "Next" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: rowLoading && rows.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-3 px-6 py-10 text-sm text-slate-500", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }),
          "Loading the selected dataset…"
        ] }) : rows.length > 0 ? /* @__PURE__ */ jsxs("table", { className: "min-w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-slate-50 text-left text-slate-700", children: /* @__PURE__ */ jsx("tr", { children: columns.map((column) => /* @__PURE__ */ jsx("th", { className: "cursor-pointer whitespace-nowrap border-b border-slate-200 px-4 py-3 font-semibold", onClick: () => toggleSort(column), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            column,
            sortColumn === column ? /* @__PURE__ */ jsx(TrendingUp, { className: `h-3.5 w-3.5 ${sortDirection === "desc" ? "rotate-180" : ""}` }) : null
          ] }) }, column)) }) }),
          /* @__PURE__ */ jsx("tbody", { children: sortedRows.map((row, index) => /* @__PURE__ */ jsx("tr", { className: "border-b border-slate-100 bg-white hover:bg-slate-50", children: columns.map((column) => /* @__PURE__ */ jsx("td", { className: "max-w-[220px] truncate px-4 py-3 text-slate-700", children: String(row[column] ?? "-") }, `${column}-${index}`)) }, `${selectedTable}-${index}`)) })
        ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-2 px-6 py-10 text-sm text-slate-500", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { className: "h-8 w-8 text-slate-300" }),
          /* @__PURE__ */ jsx("p", { children: "No records matched the current filters." })
        ] }) })
      ] })
    ] })
  ] }) });
}
export {
  AdminReportsPage as component
};
