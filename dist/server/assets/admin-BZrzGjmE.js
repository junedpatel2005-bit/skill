import "react/jsx-runtime";
import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { C as getAdminPaymentTransactions, y as getAdminDisputeRecords, A as getAdminJobRecords, x as getAdminDashboardSnapshot, D as getAdminUserStats, E as getAdminUsers, u as findUserByEmail, ay as verifyPassword, ad as setResponseHeader, o as createSessionCookie, aw as updateUserRoleByAdmin, at as updateUserActiveStatusByAdmin, ag as updateAdminDisputeStatus } from "../server.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { b as createServerFn } from "./server-B8npIiGW.js";
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
import "@tanstack/react-router";
import "@tanstack/react-router/ssr/server";
const getAdminPageData_createServerFn_handler = createServerRpc({
  id: "94a5151b754e4ae8e302d55aab22e133a9dce54b31bf69ca5e2ae9a5a5533ee9",
  name: "getAdminPageData",
  filename: "src/admin/admin.tsx"
}, (opts) => getAdminPageData.__executeServer(opts));
const getAdminPageData = createServerFn({
  method: "GET"
}).handler(getAdminPageData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return {
      viewer: null,
      users: [],
      stats: null,
      dashboard: null,
      jobRecords: [],
      disputeRecords: [],
      paymentTransactions: []
    };
  }
  if (viewer.role !== "ADMIN") {
    return {
      viewer,
      users: [],
      stats: null,
      dashboard: null,
      jobRecords: [],
      disputeRecords: [],
      paymentTransactions: []
    };
  }
  return {
    viewer,
    users: getAdminUsers(),
    stats: getAdminUserStats(),
    dashboard: getAdminDashboardSnapshot(),
    jobRecords: getAdminJobRecords(),
    disputeRecords: getAdminDisputeRecords(),
    paymentTransactions: getAdminPaymentTransactions()
  };
});
const submitAdminLogin_createServerFn_handler = createServerRpc({
  id: "1b3c5d79d45933cb865cd3fd1c2138207d34bd67fdd45ca5143b6b5e0e60e1e3",
  name: "submitAdminLogin",
  filename: "src/admin/admin.tsx"
}, (opts) => submitAdminLogin.__executeServer(opts));
const submitAdminLogin = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(submitAdminLogin_createServerFn_handler, async ({
  data
}) => {
  const email = data.username.trim().toLowerCase();
  const existingAdmin = findUserByEmail(email);
  const passwordCheck = await verifyPassword(data.password, existingAdmin?.passwordHash ?? null);
  if (!existingAdmin || existingAdmin.role !== "ADMIN" || !existingAdmin.isActive || !passwordCheck.valid) {
    return {
      ok: false,
      formError: "Invalid admin username or password."
    };
  }
  const adminUser = existingAdmin;
  setResponseHeader("Set-Cookie", createSessionCookie({
    id: adminUser.id,
    role: "ADMIN",
    firstName: adminUser.firstName,
    lastName: adminUser.lastName,
    email: adminUser.email,
    phone: adminUser.phone,
    avatarUrl: adminUser.avatarUrl,
    authProvider: adminUser.authProvider
  }));
  return {
    ok: true
  };
});
const updateManagedUserRole_createServerFn_handler = createServerRpc({
  id: "0130dd17c6708cf113632c167a9382723e32cfb27fbce797720189b1d05ebac5",
  name: "updateManagedUserRole",
  filename: "src/admin/admin.tsx"
}, (opts) => updateManagedUserRole.__executeServer(opts));
const updateManagedUserRole = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateManagedUserRole_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can change user roles.");
  }
  if (viewer.id === data.userId && data.role !== "ADMIN") {
    throw new Error("You cannot remove your own admin role.");
  }
  return updateUserRoleByAdmin(data.userId, data.role);
});
const updateManagedUserStatus_createServerFn_handler = createServerRpc({
  id: "9c4e4e55713c4ee4c8202a7c32106c8cc84d850c6ea382a3a7f315b63ccbeecd",
  name: "updateManagedUserStatus",
  filename: "src/admin/admin.tsx"
}, (opts) => updateManagedUserStatus.__executeServer(opts));
const updateManagedUserStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateManagedUserStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can change user status.");
  }
  if (viewer.id === data.userId && !data.isActive) {
    throw new Error("You cannot deactivate your own admin account.");
  }
  return updateUserActiveStatusByAdmin(data.userId, data.isActive);
});
const updateManagedDisputeStatus_createServerFn_handler = createServerRpc({
  id: "34873e21d20b0abcbe478ce7f33f3e9c5997242623c5f24d3c882940549f32b6",
  name: "updateManagedDisputeStatus",
  filename: "src/admin/admin.tsx"
}, (opts) => updateManagedDisputeStatus.__executeServer(opts));
const updateManagedDisputeStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateManagedDisputeStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can update disputes.");
  }
  return updateAdminDisputeStatus(data.disputeId, data.status);
});
export {
  getAdminPageData_createServerFn_handler,
  submitAdminLogin_createServerFn_handler,
  updateManagedDisputeStatus_createServerFn_handler,
  updateManagedUserRole_createServerFn_handler,
  updateManagedUserStatus_createServerFn_handler
};
