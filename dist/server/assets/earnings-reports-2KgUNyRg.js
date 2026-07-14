import { jsx, jsxs } from "react/jsx-runtime";
import { A as AppShell, s as createSsrRpc } from "./router-CCfZqKWO.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ShieldCheck, CircleDollarSign, Percent, Wallet, ArrowDownToLine, BadgeDollarSign, Loader2, FileSpreadsheet, Download, FileText, Printer, CalendarRange, Landmark, CheckCircle2, AlertCircle, UserRound, Search, ReceiptText } from "lucide-react";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { I as Input } from "./input-C0QjszdI.js";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-DPaGlibP.js";
import { b as createServerFn } from "./server-B8npIiGW.js";
import "@tanstack/react-query";
import "react-redux";
import "sonner";
import "@reduxjs/toolkit";
import "socket.io-client";
import "@hookform/resolvers/zod";
import "react-hook-form";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./client-profile-B1xUUnTZ.js";
import "zod";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slider";
import "../server.js";
import "node:crypto";
import "node:fs/promises";
import "node:path";
import "better-sqlite3";
import "nodemailer";
import "node:async_hooks";
import "h3-v2";
import "jsdom";
import "dompurify";
import "./forgot-password-D1FDXg_D.js";
import "@radix-ui/react-accordion";
import "@radix-ui/react-switch";
import "@radix-ui/react-select";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
const updatePayoutReviewStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("d7a541c7e5704b9aa7e159708b81abd37fbd1a93c5c947fea36e447fdc291d62"));
function EarningsReports() {
  const data = useLoaderData({
    from: "/earnings-reports"
  });
  const router = useRouter();
  const [transactionQuery, setTransactionQuery] = useState("");
  const [payoutQuery, setPayoutQuery] = useState("");
  const [professionalQuery, setProfessionalQuery] = useState("");
  const [reportPeriod, setReportPeriod] = useState("ALL");
  const [transactionStatus, setTransactionStatus] = useState("ALL");
  const [payoutStatus, setPayoutStatus] = useState("ALL");
  const [pendingPayoutId, setPendingPayoutId] = useState(null);
  const [summaryResult, setSummaryResult] = useState(null);
  if (!data.viewer || data.viewer.role !== "ADMIN" || !data.report) {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-lg border border-border bg-card p-6 text-center shadow-soft", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "mx-auto h-8 w-8 text-primary" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-xl font-semibold", children: "Admin access required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in from the admin panel to view earnings and payout reports." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-5 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const report = data.report;
  const visibleTransactions = useMemo(() => filterTransactions(report.transactions, transactionQuery, reportPeriod, transactionStatus), [report.transactions, transactionQuery, reportPeriod, transactionStatus]);
  const visiblePayouts = useMemo(() => filterPayouts(report.payouts, payoutQuery, reportPeriod, payoutStatus), [report.payouts, payoutQuery, reportPeriod, payoutStatus]);
  const visibleProfessionals = useMemo(() => filterProfessionals(report.professionals, professionalQuery), [report.professionals, professionalQuery]);
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  const [downloading, setDownloading] = useState(null);
  async function handlePayoutStatus(payout, status) {
    setPendingPayoutId(payout.id);
    try {
      await updatePayoutReviewStatus({
        data: {
          payoutId: payout.id,
          status
        }
      });
      await router.invalidate();
    } finally {
      setPendingPayoutId(null);
    }
  }
  async function exportReport(table, format) {
    setDownloading(format);
    try {
      const res = await fetch("/api/v1/reports/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          table,
          format,
          reportName: `Admin-${table}-report`,
          filters: {}
          // All data for earnings/payouts as requested
        })
      });
      if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));
      const blob = await res.blob();
      const disposition = res.headers.get("content-disposition") || "";
      const filenameMatch = disposition.match(/filename=(?:"?)([^";]+)/);
      const fileName = filenameMatch ? filenameMatch[1].replace(/"/g, "") : `${table}-${format.toLowerCase()}.bin`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Export failed: ${err.message}`);
    } finally {
      setDownloading(null);
    }
  }
  function printReport(title, columns, dataRows) {
    const reportRows = dataRows.map((row) => {
      return columns.map((column) => `${column}: ${String(row[column] ?? "")}`).join(" | ");
    });
    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) return;
    printWindow.document.write(`<!doctype html><html><head><title>${title}</title><style>body{font-family:Arial,sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;font-size:12px}th{background:#f8fafc}</style></head><body><h1>${title}</h1><p>Generated on ${(/* @__PURE__ */ new Date()).toLocaleString()}</p><table><thead><tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr></thead><tbody>${reportRows.map((row) => `<tr><td>${row.replace(/\|/g, "</td><td>")}</td></tr>`).join("")}</tbody></table></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
  return /* @__PURE__ */ jsx(AppShell, { title: "Earnings, Commission & Payout Reports", userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: /* @__PURE__ */ jsxs("div", { className: "space-y-8 px-2 py-3 sm:px-4 lg:px-6", children: [
    /* @__PURE__ */ jsxs("section", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5", children: [
      /* @__PURE__ */ jsx(SummaryCard, { icon: CircleDollarSign, label: "Gross earnings", value: formatMoney(report.totals.grossEarnings), caption: `${report.totals.transactionCount} transaction records`, active: summaryResult === "transactions", onClick: () => setSummaryResult("transactions") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: Percent, label: "Commission", value: formatMoney(report.totals.commissionAmount), caption: `${Math.round(report.commissionRate * 100)}% platform share`, active: summaryResult === "transactions", onClick: () => setSummaryResult("transactions") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: Wallet, label: "Net payable", value: formatMoney(report.totals.netEarnings), caption: "After commission", active: summaryResult === "transactions", onClick: () => setSummaryResult("transactions") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: ArrowDownToLine, label: "Requested payouts", value: formatMoney(report.totals.requestedPayouts), caption: `${report.totals.payoutCount} payout records`, active: summaryResult === "payouts", onClick: () => setSummaryResult("payouts") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: BadgeDollarSign, label: "Available balance", value: formatMoney(report.totals.availableBalance), caption: "Net minus non-rejected payouts", active: summaryResult === "balances", onClick: () => setSummaryResult("balances") })
    ] }),
    summaryResult ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm shadow-sm", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-medium text-slate-700", children: [
        "Showing ",
        summaryResult === "balances" ? "professional balances" : summaryResult
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "outline", onClick: () => setSummaryResult(null), children: "Show all" })
    ] }) : null,
    /* @__PURE__ */ jsx(ReportControls, { period: reportPeriod, transactionStatus, payoutStatus, onPeriodChange: setReportPeriod, onTransactionStatusChange: setTransactionStatus, onPayoutStatusChange: setPayoutStatus, onReset: () => {
      setReportPeriod("ALL");
      setTransactionStatus("ALL");
      setPayoutStatus("ALL");
      setTransactionQuery("");
      setPayoutQuery("");
      setProfessionalQuery("");
    } }),
    /* @__PURE__ */ jsx(FinanceOverview, { report }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-5", children: [
      (!summaryResult || summaryResult === "balances") && /* @__PURE__ */ jsx(ProfessionalSummarySection, { professionals: visibleProfessionals, query: professionalQuery, onQueryChange: setProfessionalQuery }),
      (!summaryResult || summaryResult === "payouts") && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-0 z-10 flex gap-2 p-4", children: [
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportReport("ProjectWithdrawal", "CSV"), disabled: !!downloading, children: [
            downloading === "CSV" ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(FileSpreadsheet, { className: "h-4 w-4" }),
            "CSV"
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportReport("ProjectWithdrawal", "EXCEL"), disabled: !!downloading, children: [
            downloading === "EXCEL" ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
            "Excel"
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportReport("ProjectWithdrawal", "PDF"), disabled: !!downloading, children: [
            downloading === "PDF" ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
            "PDF"
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "secondary", onClick: () => printReport("Payout Reports", ["professionalName", "amount", "status", "destinationType", "destinationLabel", "createdAt"], visiblePayouts), children: [
            /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4" }),
            "Print"
          ] })
        ] }),
        /* @__PURE__ */ jsx(PayoutSection, { payouts: visiblePayouts, query: payoutQuery, pendingPayoutId, onQueryChange: setPayoutQuery, onStatusChange: handlePayoutStatus })
      ] }),
      (!summaryResult || summaryResult === "transactions") && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute right-0 top-0 z-10 flex gap-2 p-4", children: [
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportReport("ProjectTransaction", "CSV"), disabled: !!downloading, children: [
            downloading === "CSV" ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(FileSpreadsheet, { className: "h-4 w-4" }),
            "CSV"
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportReport("ProjectTransaction", "EXCEL"), disabled: !!downloading, children: [
            downloading === "EXCEL" ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
            "Excel"
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", onClick: () => exportReport("ProjectTransaction", "PDF"), disabled: !!downloading, children: [
            downloading === "PDF" ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
            "PDF"
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "secondary", onClick: () => printReport("Transaction Reports", ["jobTitle", "amount", "commissionAmount", "netPayoutAmount", "status", "dateTime"], visibleTransactions), children: [
            /* @__PURE__ */ jsx(Printer, { className: "h-4 w-4" }),
            "Print"
          ] })
        ] }),
        /* @__PURE__ */ jsx(TransactionSection, { transactions: visibleTransactions, query: transactionQuery, onQueryChange: setTransactionQuery })
      ] })
    ] })
  ] }) });
}
function ReportControls({
  period,
  transactionStatus,
  payoutStatus,
  onPeriodChange,
  onTransactionStatusChange,
  onPayoutStatusChange,
  onReset
}) {
  return /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6 shadow-lg sm:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700", children: /* @__PURE__ */ jsx(CalendarRange, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-blue-900", children: "Reporting options" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-700", children: "Narrow transactions and payouts without changing lifetime totals." })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: onReset, className: "border-blue-300 text-blue-700 hover:bg-blue-50", children: "Reset filters" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2", children: "Reporting period" }),
        /* @__PURE__ */ jsxs(Select, { value: period, onValueChange: (value) => onPeriodChange(value), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "border-blue-300 text-blue-900", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "ALL", children: "All time" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "30_DAYS", children: "Last 30 days" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "90_DAYS", children: "Last 90 days" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "THIS_YEAR", children: "This year" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2", children: "Transaction status" }),
        /* @__PURE__ */ jsxs(Select, { value: transactionStatus, onValueChange: onTransactionStatusChange, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "border-blue-300 text-blue-900", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "ALL", children: "All statuses" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "COMPLETED", children: "Completed" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "CANCELLED", children: "Cancelled" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2", children: "Payout status" }),
        /* @__PURE__ */ jsxs(Select, { value: payoutStatus, onValueChange: onPayoutStatusChange, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "border-blue-300 text-blue-900", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "ALL", children: "All statuses" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "PENDING", children: "Pending" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "PROCESSING", children: "Processing" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "COMPLETED", children: "Completed" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "REJECTED", children: "Rejected" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function FinanceOverview({
  report
}) {
  const payoutLiability = report.totals.availableBalance + report.totals.pendingPayouts;
  const reconciledNet = report.totals.paidPayouts + report.totals.pendingPayouts + report.totals.availableBalance;
  const reconciliationDifference = Math.abs(report.totals.netEarnings - reconciledNet);
  const isBalanced = reconciliationDifference < 0.01;
  return /* @__PURE__ */ jsxs("section", { className: "mt-6 grid gap-8 lg:grid-cols-[1fr_1fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 p-6 shadow-lg sm:p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-indigo-900", children: "Payout pipeline" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-indigo-700", children: "Current movement of professional funds." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-indigo-100 to-indigo-200 text-indigo-700", children: /* @__PURE__ */ jsx(Landmark, { className: "h-5 w-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsx(PipelineMetric, { label: "Paid out", value: report.totals.paidPayouts }),
        /* @__PURE__ */ jsx(PipelineMetric, { label: "Pending", value: report.totals.pendingPayouts }),
        /* @__PURE__ */ jsx(PipelineMetric, { label: "Processing", value: report.totals.processingPayouts }),
        /* @__PURE__ */ jsx(PipelineMetric, { label: "Rejected", value: report.totals.rejectedPayouts })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "text-slate-600", children: "Outstanding professional liability" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-slate-900", children: formatMoney(payoutLiability) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6 shadow-lg sm:p-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-emerald-900", children: "Finance reconciliation" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-emerald-700", children: "Checks net earnings against paid, queued, and available balances." })
        ] }),
        isBalanced ? /* @__PURE__ */ jsx(CheckCircle2, { className: "h-5 w-5 text-emerald-600" }) : /* @__PURE__ */ jsx(AlertCircle, { className: "h-5 w-5 text-rose-600" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-3", children: [
        /* @__PURE__ */ jsx(ReconciliationRow, { label: "Net professional earnings", value: report.totals.netEarnings }),
        /* @__PURE__ */ jsx(ReconciliationRow, { label: "Reconciled funds", value: reconciledNet }),
        /* @__PURE__ */ jsx(ReconciliationRow, { label: "Difference", value: reconciliationDifference, strong: true })
      ] }),
      /* @__PURE__ */ jsx(Badge, { className: "mt-4", variant: isBalanced ? "default" : "destructive", children: isBalanced ? "Balances reconcile" : "Review required" })
    ] })
  ] });
}
function PipelineMetric({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-3", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-indigo-600", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 font-semibold text-indigo-900", children: formatMoney(value) })
  ] });
}
function ReconciliationRow({
  label,
  value,
  strong
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 text-sm", children: [
    /* @__PURE__ */ jsx("span", { className: "text-emerald-700", children: label }),
    /* @__PURE__ */ jsx("span", { className: strong ? "font-semibold text-emerald-900" : "font-medium text-emerald-800", children: formatMoney(value) })
  ] });
}
function ProfessionalSummarySection({
  professionals,
  query,
  onQueryChange
}) {
  const totals = professionals.reduce((acc, p) => {
    acc.gross += Number(p.grossEarnings || 0);
    acc.commission += Number(p.commissionAmount || 0);
    acc.net += Number(p.netEarnings || 0);
    acc.requested += Number(p.requestedPayouts || 0);
    acc.paid += Number(p.paidPayouts || 0);
    acc.available += Number(p.availableBalance || 0);
    return acc;
  }, {
    gross: 0,
    commission: 0,
    net: 0,
    requested: 0,
    paid: 0,
    available: 0
  });
  return /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-violet-50 p-6 shadow-lg sm:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-violet-100 to-violet-200 text-violet-700", children: /* @__PURE__ */ jsx(UserRound, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-violet-900", children: "Professional balances" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-violet-700", children: "Per-professional gross earnings, commission, payout movement, and remaining payable balance." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full lg:max-w-xs", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
        /* @__PURE__ */ jsx(Input, { value: query, onChange: (event) => onQueryChange(event.target.value), placeholder: "Search professionals...", className: "pl-9" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "divide-y divide-violet-200 rounded-lg border border-violet-200", children: [
      professionals.length ? professionals.map((professional) => /* @__PURE__ */ jsxs("article", { className: "p-6 hover:bg-violet-50/30 transition-colors", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-violet-900", children: professional.professionalName }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-violet-600", children: professional.professionalEmail }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-violet-500", children: [
            professional.transactionCount,
            " transactions / ",
            professional.payoutCount,
            " payouts"
          ] }),
          professional.pendingPayouts > 0 || professional.availableBalance > 0 ? /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "mt-2 px-2 py-1 text-xs bg-violet-100 text-violet-700 border-violet-300", children: "Actionable balance" }) : null
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-7", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-violet-600", children: "Gross" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-semibold text-violet-900", children: formatMoney(professional.grossEarnings) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-rose-600", children: "Commission" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 font-semibold text-rose-600", children: [
              "-",
              formatMoney(professional.commissionAmount)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-violet-600", children: "Net" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-semibold text-violet-900", children: formatMoney(professional.netEarnings) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-violet-600", children: "Requested" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-semibold text-violet-900", children: formatMoney(professional.requestedPayouts) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-violet-600", children: "Paid" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-semibold text-violet-900", children: formatMoney(professional.paidPayouts) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-emerald-600", children: "Available" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-semibold text-emerald-700", children: formatMoney(professional.availableBalance) })
          ] })
        ] })
      ] }, professional.professionalId)) : /* @__PURE__ */ jsx(EmptyState, { title: "No professional earnings found", description: "Completed project transactions and payout requests will appear here." }),
      professionals.length > 0 ? /* @__PURE__ */ jsxs("article", { className: "bg-violet-100/50 p-6", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-3 text-sm font-semibold text-violet-900", children: "Total Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-7", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-violet-300 bg-violet-100 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-violet-700", children: "Gross" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-bold text-violet-900", children: formatMoney(totals.gross) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-rose-300 bg-rose-100 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-rose-700", children: "Commission" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-bold text-rose-700", children: totals.commission < 0 ? `-${formatMoney(Math.abs(totals.commission))}` : formatMoney(totals.commission) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-violet-300 bg-violet-100 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-violet-700", children: "Net" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-bold text-violet-900", children: formatMoney(totals.net) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-violet-300 bg-violet-100 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-violet-700", children: "Requested" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-bold text-violet-900", children: formatMoney(totals.requested) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-violet-300 bg-violet-100 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-violet-700", children: "Paid" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-bold text-violet-900", children: formatMoney(totals.paid) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-emerald-300 bg-emerald-100 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-emerald-700", children: "Available" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 font-bold text-emerald-700", children: formatMoney(totals.available) })
          ] })
        ] })
      ] }) : null
    ] })
  ] });
}
function PayoutSection({
  payouts,
  query,
  pendingPayoutId,
  onQueryChange,
  onStatusChange
}) {
  return /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-cyan-50 p-6 shadow-lg sm:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-700", children: /* @__PURE__ */ jsx(ArrowDownToLine, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-cyan-900", children: "Payout requests" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-cyan-700", children: "All bank, UPI, and wallet withdrawal requests with admin status control." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full lg:max-w-xs", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
        /* @__PURE__ */ jsx(Input, { value: query, onChange: (event) => onQueryChange(event.target.value), placeholder: "Search payouts...", className: "pl-9" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-cyan-200 rounded-lg border border-cyan-200", children: payouts.length ? payouts.map((payout) => /* @__PURE__ */ jsxs("article", { className: "p-6 hover:bg-cyan-50/30 transition-colors", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-cyan-900", children: payout.professionalName }),
          /* @__PURE__ */ jsx(Badge, { variant: getPayoutStatusVariant(payout.status), children: formatEnum(payout.status) }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-cyan-300 text-cyan-700", children: formatEnum(payout.destinationType) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-cyan-700", children: payout.professionalEmail }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-cyan-700", children: [
          "Destination:",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-medium text-cyan-900", children: payout.destinationLabel })
        ] }),
        payout.note ? /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-cyan-700", children: [
          "Note: ",
          payout.note
        ] }) : null,
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-cyan-600", children: [
          "Requested ",
          formatDateTime(payout.createdAt),
          " / Updated",
          " ",
          formatDateTime(payout.updatedAt)
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-3 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-cyan-600", children: "Amount" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 font-bold text-cyan-900 text-lg", children: formatMoney(payout.amount) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-cyan-200 bg-gradient-to-br from-cyan-50 to-white p-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-cyan-600", children: "Status" }),
          /* @__PURE__ */ jsxs(Select, { value: payout.status, disabled: pendingPayoutId === payout.id, onValueChange: (value) => onStatusChange(payout, value), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "mt-1 border-cyan-300 text-cyan-900 text-sm", "aria-label": `Update payout ${payout.id} status`, children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "PENDING", children: "Pending" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "PROCESSING", children: "Processing" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "COMPLETED", children: "Completed" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "REJECTED", children: "Rejected" })
            ] })
          ] }),
          pendingPayoutId === payout.id ? /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-cyan-600", children: "Saving..." }) : null
        ] })
      ] })
    ] }, payout.id)) : /* @__PURE__ */ jsx(EmptyState, { title: "No payout requests found", description: "Professional withdrawal requests will appear here." }) })
  ] });
}
function TransactionSection({
  transactions,
  query,
  onQueryChange
}) {
  return /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-6 shadow-lg sm:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700", children: /* @__PURE__ */ jsx(ReceiptText, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-amber-900", children: "All transaction records" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700", children: "Every project payment row with gross amount, commission deduction, and net payout calculation." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full lg:max-w-xs", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" }),
        /* @__PURE__ */ jsx(Input, { value: query, onChange: (event) => onQueryChange(event.target.value), placeholder: "Search transactions...", className: "pl-9" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "divide-y divide-amber-200 rounded-lg border border-amber-200", children: transactions.length ? transactions.map((transaction) => /* @__PURE__ */ jsxs("article", { className: "p-6 hover:bg-amber-50/30 transition-colors", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center", children: /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-amber-900", children: transaction.jobTitle }),
          /* @__PURE__ */ jsx(Badge, { variant: transaction.status === "COMPLETED" ? "default" : "outline", children: formatEnum(transaction.status) }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "border-amber-300 text-amber-700", children: formatEnum(transaction.paymentType) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-amber-700", children: transaction.projectCategory }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-amber-600", children: [
          "Tracking #",
          transaction.trackingId
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-amber-700", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Client:" }),
          " ",
          transaction.clientName
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-amber-700", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Professional:" }),
          " ",
          transaction.professionalName
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-amber-600", children: "Gross" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 font-bold text-amber-900 text-lg", children: formatMoney(transaction.amount) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-rose-600", children: "Commission" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 font-bold text-rose-600 text-lg", children: [
            "-",
            formatMoney(transaction.commissionAmount)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-amber-600", children: "Net" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 font-bold text-amber-900 text-lg", children: formatMoney(transaction.netPayoutAmount) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-amber-600", children: "Date" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 font-semibold text-amber-900", children: formatDate(transaction.dateTime) })
        ] })
      ] })
    ] }, transaction.id)) : /* @__PURE__ */ jsx(EmptyState, { title: "No transactions found", description: "Completed project payment rows will appear here." }) })
  ] });
}
function SummaryCard({
  icon: Icon,
  label,
  value,
  caption,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxs("button", { type: "button", onClick, className: `group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${active ? "border-slate-900 bg-slate-50" : ""} text-left`, children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gradient-to-br from-blue-50 to-slate-100 p-3 text-slate-700", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm font-medium text-slate-600", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-slate-900", children: value }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-slate-500", children: caption })
  ] });
}
function EmptyState({
  title,
  description
}) {
  return /* @__PURE__ */ jsxs("div", { className: "p-6 text-center text-sm text-slate-600", children: [
    /* @__PURE__ */ jsx("p", { className: "font-semibold text-slate-900", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-1", children: description })
  ] });
}
function filterTransactions(transactions, query, period, status) {
  const term = query.trim().toLowerCase();
  return transactions.filter((transaction) => {
    if (!isInReportPeriod(transaction.dateTime, period)) return false;
    if (status !== "ALL" && transaction.status !== status) return false;
    if (!term) return true;
    return [transaction.jobTitle, transaction.projectCategory, transaction.clientName, transaction.clientEmail, transaction.professionalName, transaction.professionalEmail, transaction.paymentType, transaction.status, transaction.description].join(" ").toLowerCase().includes(term);
  });
}
function filterPayouts(payouts, query, period, status) {
  const term = query.trim().toLowerCase();
  return payouts.filter((payout) => {
    if (!isInReportPeriod(payout.createdAt, period)) return false;
    if (status !== "ALL" && payout.status !== status) return false;
    if (!term) return true;
    return [payout.professionalName, payout.professionalEmail, payout.destinationType, payout.destinationLabel, payout.status, payout.note].join(" ").toLowerCase().includes(term);
  });
}
function isInReportPeriod(value, period) {
  if (period === "ALL") return true;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const now = /* @__PURE__ */ new Date();
  if (period === "THIS_YEAR") return date.getFullYear() === now.getFullYear();
  const days = period === "30_DAYS" ? 30 : 90;
  return date.getTime() >= now.getTime() - days * 24 * 60 * 60 * 1e3;
}
function filterProfessionals(professionals, query) {
  const term = query.trim().toLowerCase();
  if (!term) {
    return professionals;
  }
  return professionals.filter((professional) => [professional.professionalName, professional.professionalEmail].join(" ").toLowerCase().includes(term));
}
function getPayoutStatusVariant(status) {
  if (status === "COMPLETED") {
    return "default";
  }
  if (status === "REJECTED") {
    return "destructive";
  }
  if (status === "PROCESSING") {
    return "secondary";
  }
  return "outline";
}
function formatMoney(value) {
  return `$${Math.round(value).toLocaleString()}`;
}
function formatDate(value) {
  if (!value) {
    return "Not set";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}
function formatDateTime(value) {
  if (!value) {
    return "Not set";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not set";
  }
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
function formatEnum(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
export {
  EarningsReports as component
};
