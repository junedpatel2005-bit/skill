import { jsx, jsxs } from "react/jsx-runtime";
import { A as AppShell, s as createSsrRpc } from "./router-CCfZqKWO.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ShieldCheck, UserRound, Clock3, CheckCircle2, XCircle, FileText, Search, FileBadge, MapPin, IdCard, FileCheck2, ImageIcon, BadgeCheck, ExternalLink, X } from "lucide-react";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { I as Input } from "./input-C0QjszdI.js";
import { R as ReportExportActions } from "./ReportExportActions-BC1o5kJ9.js";
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
import "./select-DPaGlibP.js";
import "@radix-ui/react-select";
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
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
const updateVerificationReviewStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("e0d667c0383670fd421af6b54f07f455c7fc8ad5909abf4b6548b358809bd6b6"));
function VerificationManagement() {
  const data = useLoaderData({
    from: "/verification-management"
  });
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pendingAction, setPendingAction] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const records = data.records;
  const visibleRecords = useMemo(() => filterRecords(records, query, statusFilter), [records, query, statusFilter]);
  const handleClosePreview = useCallback(() => {
    setPreviewFile(null);
  }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClosePreview();
      }
    };
    if (previewFile) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewFile, handleClosePreview]);
  if (!data.viewer || data.viewer.role !== "ADMIN") {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-lg border border-border bg-card p-6 text-center shadow-soft", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "mx-auto h-8 w-8 text-primary" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-xl font-semibold", children: "Admin access required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in from the admin panel to review professional verification." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-5 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  const counts = getStatusCounts(records);
  async function handleReview(record, status) {
    const actionKey = `${status}-${record.userId}`;
    setPendingAction(actionKey);
    try {
      await updateVerificationReviewStatus({
        data: {
          userId: record.userId,
          status
        }
      });
      await router.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  return /* @__PURE__ */ jsxs(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col justify-between gap-3 lg:flex-row lg:items-end", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-primary", children: "Verification management" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 text-2xl font-semibold tracking-tight", children: "Verification Management Dashboard" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Review professional identity documents and approve verified providers." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx(ReportExportActions, { table: "User", reportName: "Verification management export", filters: {
          userType: "PROFESSIONAL"
        }, variant: "outline" }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/user-management", children: "User Management" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Back to admin" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-5", children: [
      /* @__PURE__ */ jsx(SummaryCard, { icon: UserRound, label: "Professionals", value: records.length, caption: "Total accounts", active: statusFilter === "all", onClick: () => setStatusFilter("all") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: Clock3, label: "Pending", value: counts.pending, caption: "Need admin review", active: statusFilter === "pending", onClick: () => setStatusFilter("pending") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: CheckCircle2, label: "Approved", value: counts.approved, caption: "Verified providers", active: statusFilter === "approved", onClick: () => setStatusFilter("approved") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: XCircle, label: "Rejected", value: counts.rejected, caption: "Needs correction", active: statusFilter === "rejected", onClick: () => setStatusFilter("rejected") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: FileText, label: "Not started", value: counts.not_started, caption: "No review yet", active: statusFilter === "not_started", onClick: () => setStatusFilter("not_started") })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mt-6 rounded-xl border border-border bg-card p-4 shadow-soft", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col justify-between gap-3 lg:flex-row lg:items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Professional verification requests" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Search by professional, email, category, city, document, or status." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-2 lg:max-w-xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search verification...", className: "pl-9" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["all", "pending", "approved", "rejected", "not_started"].map((status) => /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: statusFilter === status ? "default" : "outline", onClick: () => setStatusFilter(status), children: status === "all" ? "All" : formatEnum(status) }, status)) })
        ] })
      ] }),
      visibleRecords.length ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-border rounded-lg border border-border", children: visibleRecords.map((record) => {
        const statusMeta = getStatusMeta(record.status);
        const documents = getDocumentItems(record);
        return /* @__PURE__ */ jsx("article", { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start", children: [
              /* @__PURE__ */ jsx("img", { src: record.avatarUrl || `https://i.pravatar.cc/100?u=verification-${record.userId}`, className: "h-12 w-12 rounded-full object-cover", alt: "" }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsx("h3", { className: "truncate font-semibold", children: record.professionalName }),
                  /* @__PURE__ */ jsx(Badge, { variant: statusMeta.variant, children: statusMeta.label }),
                  /* @__PURE__ */ jsx(Badge, { variant: record.isActive ? "default" : "outline", children: record.isActive ? "Active" : "Inactive" }),
                  /* @__PURE__ */ jsx(Badge, { variant: record.isVerified ? "default" : "secondary", children: record.isVerified ? "Verified" : "Not verified" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsx("span", { children: record.professionalEmail }),
                  /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(FileBadge, { className: "h-3.5 w-3.5" }),
                    record.professionalCategory || "Category not set"
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }),
                    record.professionalCity || "City not set"
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Clock3, { className: "h-3.5 w-3.5" }),
                    "Updated ",
                    formatDateTime(record.updatedAt)
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-5", children: documents.map((document2) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-background p-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(document2.icon, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsx("p", { className: "min-w-0 truncate text-sm font-medium", children: document2.label })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsx(Badge, { variant: document2.hasValue ? "default" : "outline", children: document2.hasValue ? "Uploaded" : "Missing" }),
                document2.href ? /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", type: "button", onClick: () => setPreviewFile({
                  url: document2.href,
                  label: document2.label
                }), children: "Open" }) }) : null
              ] })
            ] }, document2.label)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 flex-wrap gap-2 xl:w-60 xl:flex-col", children: [
            /* @__PURE__ */ jsxs(Button, { type: "button", className: "gap-2", disabled: pendingAction !== null || record.status === "approved", onClick: () => handleReview(record, "approved"), children: [
              /* @__PURE__ */ jsx(CheckCircle2, { className: "h-4 w-4" }),
              "Approve"
            ] }),
            /* @__PURE__ */ jsxs(Button, { type: "button", variant: "destructive", className: "gap-2", disabled: pendingAction !== null || record.status === "rejected", onClick: () => handleReview(record, "rejected"), children: [
              /* @__PURE__ */ jsx(XCircle, { className: "h-4 w-4" }),
              "Reject"
            ] }),
            /* @__PURE__ */ jsxs(Button, { type: "button", variant: "outline", className: "gap-2", disabled: pendingAction !== null || record.status === "pending", onClick: () => handleReview(record, "pending"), children: [
              /* @__PURE__ */ jsx(Clock3, { className: "h-4 w-4" }),
              "Mark pending"
            ] }),
            pendingAction?.endsWith(`-${record.userId}`) ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Saving review..." }) : null
          ] })
        ] }) }, record.userId);
      }) }) : /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground", children: "No verification records found." })
    ] }),
    previewFile ? /* @__PURE__ */ jsx(FilePreviewModal, { url: previewFile.url, label: previewFile.label, onClose: handleClosePreview }) : null
  ] });
}
function FilePreviewModal({
  url,
  label,
  onClose
}) {
  const overlayRef = useRef(null);
  const previewType = getPreviewType(url);
  const handleOverlayClick = useCallback((event) => {
    if (event.target === overlayRef.current) {
      onClose();
    }
  }, [onClose]);
  return /* @__PURE__ */ jsx("div", { ref: overlayRef, onClick: handleOverlayClick, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4", children: /* @__PURE__ */ jsxs("div", { className: "relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-xl bg-background shadow-2xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border px-5 py-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(BadgeCheck, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold", children: label })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", type: "button", onClick: () => openDocumentInNewTab(url), children: [
          /* @__PURE__ */ jsx(ExternalLink, { className: "mr-1.5 h-3.5 w-3.5" }),
          "Open in new tab"
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto p-5", children: previewType === "image" ? /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: url, alt: label, className: "max-h-[70vh] max-w-full rounded-lg object-contain" }) }) : previewType === "pdf" ? /* @__PURE__ */ jsx("iframe", { src: `${url}#toolbar=1`, title: label, className: "h-[70vh] w-full rounded-lg" }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx(FileText, { className: "h-16 w-16 text-muted-foreground" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Preview not available" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Open this file in a new tab to view it." })
      ] }),
      /* @__PURE__ */ jsxs(Button, { type: "button", onClick: () => openDocumentInNewTab(url), children: [
        /* @__PURE__ */ jsx(ExternalLink, { className: "mr-2 h-4 w-4" }),
        "Open in new tab"
      ] })
    ] }) })
  ] }) });
}
function getPreviewType(url) {
  const normalized = url.trim().toLowerCase();
  if (normalized.startsWith("data:image/") || /\.(jpe?g|png|gif|bmp|webp|svg)(\?|#|$)/i.test(normalized)) {
    return "image";
  }
  if (normalized.startsWith("data:application/pdf") || /\.pdf(\?|#|$)/i.test(normalized)) {
    return "pdf";
  }
  return "other";
}
function openDocumentInNewTab(url) {
  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    return;
  }
  if (!trimmedUrl.startsWith("data:")) {
    window.open(trimmedUrl, "_blank", "noopener,noreferrer");
    return;
  }
  try {
    const blob = dataUrlToBlob(trimmedUrl);
    const objectUrl = URL.createObjectURL(blob);
    window.open(objectUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 6e4);
  } catch {
    window.open(trimmedUrl, "_blank", "noopener,noreferrer");
  }
}
function dataUrlToBlob(dataUrl) {
  const [header, payload] = dataUrl.split(",", 2);
  const mimeType = header.match(/^data:([^;]+)/)?.[1] || "application/octet-stream";
  const isBase64 = /;base64$/i.test(header) || /;base64;/i.test(header);
  const binary = isBase64 ? atob(payload || "") : decodeURIComponent(payload || "");
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new Blob([bytes], {
    type: mimeType
  });
}
function SummaryCard({
  icon: Icon,
  label,
  value,
  caption,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxs("button", { type: "button", onClick, className: `rounded-lg border bg-card p-4 text-left shadow-soft transition-colors hover:border-primary/40 hover:bg-muted/30 ${active ? "border-primary bg-primary/5" : "border-border"}`, children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-2xl font-semibold", children: value.toLocaleString() }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: caption })
  ] });
}
function getDocumentItems(record) {
  return [{
    label: "Government ID",
    icon: IdCard,
    href: record.governmentIdUrl,
    hasValue: Boolean(record.governmentIdUrl)
  }, {
    label: "License",
    icon: FileBadge,
    href: record.licenseUrl,
    hasValue: Boolean(record.licenseUrl)
  }, {
    label: "Certifications",
    icon: FileCheck2,
    href: record.certifications[0] || "",
    hasValue: record.certifications.length > 0
  }, {
    label: "Insurance",
    icon: FileText,
    href: record.insuranceUrl,
    hasValue: Boolean(record.insuranceUrl)
  }, {
    label: "Selfie",
    icon: ImageIcon,
    href: record.selfieUrl,
    hasValue: Boolean(record.selfieUrl)
  }];
}
function getStatusCounts(records) {
  return records.reduce((counts, record) => ({
    ...counts,
    [record.status]: counts[record.status] + 1
  }), {
    not_started: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
}
function filterRecords(records, query, statusFilter) {
  const term = query.trim().toLowerCase();
  return records.filter((record) => {
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    if (!matchesStatus) {
      return false;
    }
    if (!term) {
      return true;
    }
    return [record.professionalName, record.professionalEmail, record.professionalCategory, record.professionalCity, record.status, record.isActive ? "active" : "inactive", record.isVerified ? "verified" : "not verified", ...record.certifications, record.governmentIdUrl, record.licenseUrl, record.insuranceUrl, record.selfieUrl].join(" ").toLowerCase().includes(term);
  });
}
function getStatusMeta(status) {
  const labels = {
    not_started: "Not started",
    pending: "Pending review",
    approved: "Approved",
    rejected: "Rejected"
  };
  return {
    label: labels[status],
    variant: status === "approved" ? "default" : status === "pending" ? "secondary" : "outline"
  };
}
function formatDateTime(value) {
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
  VerificationManagement as component
};
