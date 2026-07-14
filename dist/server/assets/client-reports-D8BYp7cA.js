import { jsx, jsxs } from "react/jsx-runtime";
import { useLoaderData, Link } from "@tanstack/react-router";
import { A as AppShell } from "./router-CCfZqKWO.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { U as UserPersonalReports } from "./UserPersonalReports-DBepvV1K.js";
import { ArrowLeft } from "lucide-react";
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
import "react";
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
import "./input-C0QjszdI.js";
import "./select-DPaGlibP.js";
import "@radix-ui/react-select";
import "./client-profile-B1xUUnTZ.js";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slider";
import "./forgot-password-D1FDXg_D.js";
import "@radix-ui/react-accordion";
import "@radix-ui/react-switch";
import "recharts";
import "./popover-Cx-UuE1R.js";
import "@radix-ui/react-popover";
import "./ReportExportActions-BC1o5kJ9.js";
function ClientReportsPage() {
  const data = useLoaderData({
    from: "/client-reports"
  });
  const displayName = `${data.viewer?.firstName || ""} ${data.viewer?.lastName || ""}`.trim() || data.viewer?.email || "Client";
  return /* @__PURE__ */ jsx(AppShell, { title: "My Reports", userName: displayName, userRole: "Client", userAvatarUrl: data.viewer?.email ?? void 0, children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4 py-8 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 mb-4", children: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsx(Link, { to: "/profile-setup", children: /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }) }) }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold tracking-tight text-slate-900", children: "My Reports" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg text-slate-600", children: "View and export your job posts, applications, and reviews." })
    ] }),
    /* @__PURE__ */ jsx(UserPersonalReports, { userRole: "CLIENT", userId: data.viewer?.id ?? 0, userName: displayName })
  ] }) });
}
export {
  ClientReportsPage as component
};
