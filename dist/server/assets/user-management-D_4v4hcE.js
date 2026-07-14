import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { A as AppShell, p as Switch, D as Dialog, b as DialogContent, e as DialogHeader, f as DialogTitle, c as DialogDescription, s as createSsrRpc } from "./router-CCfZqKWO.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import { ShieldCheck, Users, BriefcaseBusiness, BadgeCheck, UserRound, Search, Mail, Phone, CalendarDays, Clock3, FolderKanban, Banknote, KeyRound, Building2, MapPin, Wallet, Star } from "lucide-react";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { I as Input } from "./input-C0QjszdI.js";
import { R as ReportExportActions } from "./ReportExportActions-BC1o5kJ9.js";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { c as cn } from "./utils-H80jjgLf.js";
import { b as createServerFn } from "./server-B8npIiGW.js";
import "@tanstack/react-query";
import "react-redux";
import "sonner";
import "@reduxjs/toolkit";
import "socket.io-client";
import "@hookform/resolvers/zod";
import "react-hook-form";
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
import "clsx";
import "tailwind-merge";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const updateManagedUserStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("d21ae227bec96e0c5dcf4b0e8804f1ee297797d383b41ca8942fdff33d67acc2"));
const updateManagedProfessionalVerification = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("243f2490899071e8ebf4a541df3ecb0b948f66d0efca85f53fb18a6ad2f99af7"));
const updateManagedUserPassword = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("e1a8f00cb9eb520da7092dad35237298bc912e8c6d9f496b539773de95a86dcd"));
function UserManagement() {
  const data = useLoaderData({
    from: "/user-management"
  });
  const router = useRouter();
  const [clientQuery, setClientQuery] = useState("");
  const [professionalQuery, setProfessionalQuery] = useState("");
  const [pendingAction, setPendingAction] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [summaryFilter, setSummaryFilter] = useState(null);
  if (!data.viewer || data.viewer.role !== "ADMIN") {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-lg border border-border bg-card p-6 text-center shadow-soft", children: [
      /* @__PURE__ */ jsx(ShieldCheck, { className: "mx-auto h-8 w-8 text-primary" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-xl font-semibold", children: "Admin access required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in from the admin panel to manage clients and professionals." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-5 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const users = data.users;
  const clients = users.filter((user) => user.role === "CLIENT");
  const professionals = users.filter((user) => user.role === "PROFESSIONAL");
  const visibleClients = filterUsers(summaryFilter === "inactive" ? clients.filter((user) => !user.isActive) : clients, clientQuery);
  const visibleProfessionals = filterUsers(summaryFilter === "verified" ? professionals.filter((user) => user.isVerified) : summaryFilter === "inactive" ? professionals.filter((user) => !user.isActive) : professionals, professionalQuery);
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  const selectedUser = users.find((user) => user.id === selectedUserId) || null;
  const selectedUserDetail = selectedUserId ? data.userDetails[selectedUserId] : void 0;
  async function handleStatusChange(user, isActive) {
    const actionKey = `status-${user.id}`;
    setPendingAction(actionKey);
    try {
      await updateManagedUserStatus({
        data: {
          userId: user.id,
          isActive
        }
      });
      await router.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handleVerificationChange(user, isVerified) {
    const actionKey = `verified-${user.id}`;
    setPendingAction(actionKey);
    try {
      await updateManagedProfessionalVerification({
        data: {
          userId: user.id,
          isVerified
        }
      });
      await router.invalidate();
    } finally {
      setPendingAction(null);
    }
  }
  async function handlePasswordChange(user, password) {
    const actionKey = `password-${user.id}`;
    setPendingAction(actionKey);
    try {
      await updateManagedUserPassword({
        data: {
          userId: user.id,
          password
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
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-primary", children: "User management" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 text-2xl font-semibold tracking-tight", children: "Clients & Professionals" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Manage account status, professional verification, and profile readiness." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx(ReportExportActions, { table: "User", reportName: "User management export", variant: "outline" }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Back to admin" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsx(SummaryCard, { icon: Users, label: "Clients", value: clients.length, caption: `${activeCount(clients)} active`, active: summaryFilter === "clients", onClick: () => setSummaryFilter(summaryFilter === "clients" ? null : "clients") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: BriefcaseBusiness, label: "Professionals", value: professionals.length, caption: `${activeCount(professionals)} active`, active: summaryFilter === "professionals", onClick: () => setSummaryFilter(summaryFilter === "professionals" ? null : "professionals") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: BadgeCheck, label: "Verified pros", value: professionals.filter((user) => user.isVerified).length, caption: "Approved professionals", active: summaryFilter === "verified", onClick: () => setSummaryFilter(summaryFilter === "verified" ? null : "verified") }),
      /* @__PURE__ */ jsx(SummaryCard, { icon: UserRound, label: "Inactive users", value: users.filter((user) => !user.isActive).length, caption: "Clients and professionals", active: summaryFilter === "inactive", onClick: () => setSummaryFilter(summaryFilter === "inactive" ? null : "inactive") })
    ] }),
    summaryFilter ? /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm", children: [
      /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
        "Showing:",
        " ",
        summaryFilter === "verified" ? "Verified professionals" : summaryFilter === "inactive" ? "Inactive users" : summaryFilter
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "button", size: "sm", variant: "outline", onClick: () => setSummaryFilter(null), children: "Show all" })
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 grid gap-5 xl:grid-cols-2", children: [
      summaryFilter !== "professionals" && summaryFilter !== "verified" ? /* @__PURE__ */ jsx(UserSection, { title: "Clients", description: "People or companies posting jobs and hiring professionals.", icon: Users, query: clientQuery, onQueryChange: setClientQuery, placeholder: "Search clients...", users: visibleClients, pendingAction, onStatusChange: handleStatusChange, onUserSelect: setSelectedUserId }) : null,
      summaryFilter !== "clients" ? /* @__PURE__ */ jsx(UserSection, { title: "Professionals", description: "Service providers, verification, rates, and availability.", icon: BriefcaseBusiness, query: professionalQuery, onQueryChange: setProfessionalQuery, placeholder: "Search professionals...", users: visibleProfessionals, pendingAction, onStatusChange: handleStatusChange, onVerificationChange: handleVerificationChange, onUserSelect: setSelectedUserId }) : null
    ] }),
    /* @__PURE__ */ jsx(UserDetailDialog, { user: selectedUser, detail: selectedUserDetail, open: selectedUser !== null, pendingAction, onStatusChange: handleStatusChange, onPasswordChange: handlePasswordChange, onOpenChange: (open) => {
      if (!open) setSelectedUserId(null);
    } }, selectedUser?.id || "closed")
  ] });
}
function UserSection({
  title,
  description,
  icon: Icon,
  query,
  onQueryChange,
  placeholder,
  users,
  pendingAction,
  onStatusChange,
  onVerificationChange,
  onUserSelect
}) {
  const isProfessionals = title === "Professionals";
  return /* @__PURE__ */ jsxs("section", { className: "rounded-xl border border-border bg-card p-4 shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: description })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:max-w-xs", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: query, onChange: (event) => onQueryChange(event.target.value), placeholder, className: "pl-9" })
      ] })
    ] }),
    users.length ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-border rounded-lg border border-border", children: users.map((user) => {
      const fullName = getFullName(user);
      const statusKey = `status-${user.id}`;
      const verifiedKey = `verified-${user.id}`;
      return /* @__PURE__ */ jsx("article", { className: "cursor-pointer p-4 transition-colors hover:bg-muted/35", onClick: () => onUserSelect(user.id), onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") onUserSelect(user.id);
      }, role: "button", tabIndex: 0, "aria-label": `View full details for ${fullName}`, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 gap-3", children: [
          /* @__PURE__ */ jsx("img", { src: user.avatarUrl || `https://i.pravatar.cc/100?u=${user.id}`, className: "h-11 w-11 rounded-full object-cover", alt: "" }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "truncate font-semibold", children: fullName }),
              /* @__PURE__ */ jsx(Badge, { variant: user.isActive ? "default" : "outline", children: user.isActive ? "Active" : "Inactive" }),
              isProfessionals ? /* @__PURE__ */ jsx(Badge, { variant: user.isVerified ? "default" : "secondary", children: user.isVerified ? "Verified" : "Pending" }) : null
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Mail, { className: "h-3.5 w-3.5" }),
                user.email
              ] }),
              user.phone ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-3.5 w-3.5" }),
                user.phone
              ] }) : null
            ] }),
            /* @__PURE__ */ jsx(UserDetails, { user })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 flex-col gap-3 rounded-lg border border-border bg-background p-3 sm:w-52", onClick: (event) => event.stopPropagation(), onKeyDown: (event) => event.stopPropagation(), children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between gap-3 text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Account active" }),
            /* @__PURE__ */ jsx(Switch, { checked: user.isActive, disabled: pendingAction !== null, onCheckedChange: (checked) => onStatusChange(user, checked), "aria-label": `${user.isActive ? "Deactivate" : "Activate"} ${fullName}` })
          ] }),
          pendingAction === statusKey ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Saving status..." }) : null,
          isProfessionals && onVerificationChange ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-between gap-3 text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Verified" }),
              /* @__PURE__ */ jsx(Switch, { checked: user.isVerified, disabled: pendingAction !== null, onCheckedChange: (checked) => onVerificationChange(user, checked), "aria-label": `${user.isVerified ? "Unverify" : "Verify"} ${fullName}` })
            ] }),
            pendingAction === verifiedKey ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Saving verification..." }) : null
          ] }) : null
        ] })
      ] }) }, user.id);
    }) }) : /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground", children: [
      "No ",
      title.toLowerCase(),
      " found."
    ] })
  ] });
}
function UserDetailDialog({
  user,
  detail,
  open,
  pendingAction,
  onStatusChange,
  onPasswordChange,
  onOpenChange
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState(null);
  if (!user) return null;
  const fullName = getFullName(user);
  const isProfessional = user.role === "PROFESSIONAL";
  const passwordPending = pendingAction === `password-${user.id}`;
  async function submitPasswordChange(event) {
    event.preventDefault();
    setPasswordMessage(null);
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setPasswordMessage({
        type: "error",
        text: passwordError
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "Password confirmation does not match."
      });
      return;
    }
    try {
      await onPasswordChange(user, newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage({
        type: "success",
        text: "Password changed successfully. The user can now log in with it."
      });
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Password could not be changed."
      });
    }
  }
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-h-[90vh] max-w-4xl overflow-y-auto p-0", children: [
    /* @__PURE__ */ jsx("div", { className: "border-b bg-muted/30 p-6", children: /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 pr-8", children: [
      /* @__PURE__ */ jsx("img", { src: user.avatarUrl || `https://i.pravatar.cc/100?u=${user.id}`, className: "h-16 w-16 rounded-full object-cover", alt: "" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl", children: fullName }),
          /* @__PURE__ */ jsx(Badge, { children: formatEnum(user.role) }),
          /* @__PURE__ */ jsx(Badge, { variant: user.isActive ? "default" : "outline", children: user.isActive ? "Active" : "Inactive" }),
          isProfessional ? /* @__PURE__ */ jsx(Badge, { variant: user.isVerified ? "default" : "secondary", children: user.isVerified ? "Verified" : "Pending verification" }) : null
        ] }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "mt-2 flex flex-wrap gap-x-4 gap-y-1", children: [
          /* @__PURE__ */ jsx("span", { children: user.email }),
          user.phone ? /* @__PURE__ */ jsx("span", { children: user.phone }) : null
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsx(DetailStat, { icon: CalendarDays, label: "Account created", value: formatDateTime(user.createdAt) }),
        /* @__PURE__ */ jsx(DetailStat, { icon: Clock3, label: "Last login", value: user.lastLoginAt ? formatDateTime(user.lastLoginAt) : "Not recorded yet" }),
        /* @__PURE__ */ jsx(DetailStat, { icon: FolderKanban, label: "Projects", value: `${detail?.projectCount || 0} total` }),
        /* @__PURE__ */ jsx(DetailStat, { icon: Banknote, label: isProfessional ? "Gross earned" : "Total paid", value: formatMoney(detail?.totalMoney || 0) })
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "overview", className: "mt-6", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "overview", children: "Overview" }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "projects", children: [
            "Projects (",
            detail?.projectCount || 0,
            ")"
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "payments", children: [
            "Payments (",
            detail?.transactions.length || 0,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsx(TabsContent, { value: "overview", className: "mt-4", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs(DetailPanel, { title: "Account information", children: [
            /* @__PURE__ */ jsx(InfoRow, { label: "Account ID", value: `#${user.id}` }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Sign-in method", value: formatSignInMethod(user) }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Account access", value: user.isActive ? "Allowed" : "Blocked" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Created", value: formatDateTime(user.createdAt) }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Last updated", value: formatDateTime(user.updatedAt) })
          ] }),
          /* @__PURE__ */ jsx(DetailPanel, { title: isProfessional ? "Professional profile" : "Client profile", children: isProfessional ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(InfoRow, { label: "Category", value: user.professionalCategory || "Not set" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "City", value: user.professionalCity || "Not set" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Experience", value: user.experienceYears ? `${user.experienceYears} years` : "Not set" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Rate", value: formatProfessionalRate(user) }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Availability", value: formatEnum(user.availabilityStatus || "available") })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(InfoRow, { label: "Company", value: user.companyName || "Not set" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Industry", value: user.industry || "Not set" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Projects posted", value: String(detail?.projectCount || 0) })
          ] }) }),
          /* @__PURE__ */ jsxs(DetailPanel, { title: "Project status", children: [
            /* @__PURE__ */ jsx(InfoRow, { label: "Active", value: String(detail?.activeProjectCount || 0) }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Completed", value: String(detail?.completedProjectCount || 0) }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Other / unassigned", value: String(Math.max(0, (detail?.projectCount || 0) - (detail?.activeProjectCount || 0) - (detail?.completedProjectCount || 0))) })
          ] }),
          /* @__PURE__ */ jsxs(DetailPanel, { title: "Money summary", children: [
            /* @__PURE__ */ jsx(InfoRow, { label: isProfessional ? "Gross earnings" : "Completed payments", value: formatMoney(detail?.totalMoney || 0) }),
            isProfessional ? /* @__PURE__ */ jsx(InfoRow, { label: "Estimated net after 10% fee", value: formatMoney((detail?.totalMoney || 0) * 0.9) }) : null,
            /* @__PURE__ */ jsx(InfoRow, { label: "Transactions", value: String(detail?.transactions.length || 0) })
          ] }),
          /* @__PURE__ */ jsxs(DetailPanel, { title: "Access and security", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 rounded-md bg-muted/50 p-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Account active" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: user.isActive ? "Login and existing sessions are allowed." : "Password login, Google login, and existing sessions are blocked." })
              ] }),
              /* @__PURE__ */ jsx(Switch, { checked: user.isActive, disabled: pendingAction !== null, onCheckedChange: (checked) => void onStatusChange(user, checked), "aria-label": `${user.isActive ? "Deactivate" : "Activate"} ${fullName}` })
            ] }),
            /* @__PURE__ */ jsxs("form", { className: "mt-4 space-y-3 border-t pt-4", onSubmit: submitPasswordChange, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(KeyRound, { className: "h-4 w-4 text-primary" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Set new password" })
              ] }),
              /* @__PURE__ */ jsx(Input, { type: "password", value: newPassword, onChange: (event) => setNewPassword(event.target.value), placeholder: "New password", autoComplete: "new-password", disabled: passwordPending }),
              /* @__PURE__ */ jsx(Input, { type: "password", value: confirmPassword, onChange: (event) => setConfirmPassword(event.target.value), placeholder: "Confirm new password", autoComplete: "new-password", disabled: passwordPending }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Use 8+ characters with uppercase, lowercase, number, and special character." }),
              passwordMessage ? /* @__PURE__ */ jsx("p", { className: `text-xs ${passwordMessage.type === "error" ? "text-destructive" : "text-emerald-600"}`, children: passwordMessage.text }) : null,
              /* @__PURE__ */ jsx(Button, { type: "submit", size: "sm", disabled: passwordPending || !newPassword || !confirmPassword, children: passwordPending ? "Changing password..." : user.hasPassword ? "Change password" : "Create password" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "projects", className: "mt-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: detail?.projects.length ? detail.projects.map((project) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: project.title }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                project.category,
                " · Created ",
                formatDate(project.createdAt)
              ] })
            ] }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", children: formatEnum(project.trackingStatus || project.status) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-2 text-sm sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(InfoRow, { label: isProfessional ? "Client" : "Professional", value: project.counterpartName || "Not assigned" }),
            /* @__PURE__ */ jsx(InfoRow, { label: "Agreed amount", value: project.agreedAmount ? formatMoney(project.agreedAmount) : "Not set" })
          ] })
        ] }, project.id)) : /* @__PURE__ */ jsx(EmptyState, { message: "No projects are connected to this user yet." }) }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "payments", className: "mt-4", children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: detail?.transactions.length ? detail.transactions.map((transaction) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: transaction.projectTitle }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              isProfessional ? "Client" : "Professional",
              ":",
              " ",
              transaction.counterpartName,
              " · ",
              formatDateTime(transaction.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-left sm:text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: formatMoney(transaction.amount, transaction.currency) }),
            /* @__PURE__ */ jsx(Badge, { variant: transaction.status === "COMPLETED" ? "default" : "outline", children: formatEnum(transaction.status) })
          ] })
        ] }, transaction.id)) : /* @__PURE__ */ jsx(EmptyState, { message: "No payment transactions are recorded for this user." }) }) })
      ] })
    ] })
  ] }) });
}
function DetailStat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border bg-card p-4", children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-semibold", children: value })
  ] });
}
function DetailPanel({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { className: "rounded-lg border p-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: title }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children })
  ] });
}
function InfoRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 text-sm", children: [
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("span", { className: "text-right font-medium", children: value })
  ] });
}
function EmptyState({
  message
}) {
  return /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground", children: message });
}
function UserDetails({
  user
}) {
  if (user.role === "CLIENT") {
    return /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Detail, { icon: Building2, label: user.companyName || "No company added" }),
      /* @__PURE__ */ jsx(Detail, { icon: BriefcaseBusiness, label: user.industry || "Industry not set" }),
      /* @__PURE__ */ jsx(Detail, { icon: ShieldCheck, label: `Joined ${formatDate(user.createdAt)}` }),
      /* @__PURE__ */ jsx(Detail, { icon: UserRound, label: formatEnum(user.authProvider) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2", children: [
    /* @__PURE__ */ jsx(Detail, { icon: BriefcaseBusiness, label: user.professionalCategory || "Category not set" }),
    /* @__PURE__ */ jsx(Detail, { icon: MapPin, label: user.professionalCity || "City not set" }),
    /* @__PURE__ */ jsx(Detail, { icon: Wallet, label: formatProfessionalRate(user) }),
    /* @__PURE__ */ jsx(Detail, { icon: Star, label: `${user.averageRating.toFixed(1)} rating / ${user.reviewCount} reviews` }),
    /* @__PURE__ */ jsx(Detail, { icon: ShieldCheck, label: `Joined ${formatDate(user.createdAt)}` }),
    /* @__PURE__ */ jsx(Detail, { icon: UserRound, label: formatEnum(user.availabilityStatus || "available") })
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
  return /* @__PURE__ */ jsxs("button", { type: "button", onClick, className: `rounded-lg border bg-card p-4 text-left shadow-soft transition-colors hover:border-primary/40 hover:bg-muted/30 ${active ? "border-primary bg-primary/5" : "border-border"}`, children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-primary" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-2xl font-semibold", children: value.toLocaleString() }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: caption })
  ] });
}
function Detail({
  icon: Icon,
  label
}) {
  return /* @__PURE__ */ jsxs("span", { className: "inline-flex min-w-0 items-center gap-1", children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5 shrink-0" }),
    /* @__PURE__ */ jsx("span", { className: "truncate", children: label })
  ] });
}
function filterUsers(users, query) {
  const term = query.trim().toLowerCase();
  if (!term) {
    return users;
  }
  return users.filter((user) => [user.firstName, user.lastName, user.email, user.phone, user.companyName, user.industry, user.professionalCategory, user.professionalCity, user.availabilityStatus, user.authProvider, user.isActive ? "active" : "inactive", user.isVerified ? "verified" : "pending"].join(" ").toLowerCase().includes(term));
}
function activeCount(users) {
  return users.filter((user) => user.isActive).length;
}
function getFullName(user) {
  return `${user.firstName} ${user.lastName}`.trim() || user.email;
}
function formatProfessionalRate(user) {
  if (user.hourlyRate) {
    return `$${user.hourlyRate.toLocaleString()}/hr`;
  }
  if (user.fixedRate) {
    return `$${user.fixedRate.toLocaleString()} fixed`;
  }
  return "Rate not set";
}
function formatDate(value) {
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
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}
function formatMoney(value, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(value);
}
function formatSignInMethod(user) {
  if (user.authProvider === "GOOGLE" && user.hasPassword) {
    return "Google + password";
  }
  return user.hasPassword ? "Password" : formatEnum(user.authProvider);
}
function validatePassword(password) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Password must include one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include one lowercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include one number.";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must include one special character.";
  return null;
}
function formatEnum(value) {
  return value.toLowerCase().split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
export {
  UserManagement as component
};
