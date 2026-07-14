import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { a0 as getUserNotificationPreferences, a1 as getUserNotifications, a5 as markUserNotificationsRead, d as clearUserNotifications, au as updateUserNotificationPreferencesByUserId } from "../server.js";
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
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const getNotificationsPageData_createServerFn_handler = createServerRpc({
  id: "08fd37130d4793ce5d4c55b60a23ef25090c5fe2a3d46a7766c0d385178406f9",
  name: "getNotificationsPageData",
  filename: "src/client/notifications.tsx"
}, (opts) => getNotificationsPageData.__executeServer(opts));
const getNotificationsPageData = createServerFn({
  method: "GET"
}).handler(getNotificationsPageData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return null;
  }
  return {
    viewer,
    notifications: getUserNotifications(viewer.id, viewer.role),
    preferences: getUserNotificationPreferences(viewer.id)
  };
});
const markNotificationsRead_createServerFn_handler = createServerRpc({
  id: "5617dd59ed60c0d159164207db053e3ad2ccdb8abef223e148530dcdfcafa6f1",
  name: "markNotificationsRead",
  filename: "src/client/notifications.tsx"
}, (opts) => markNotificationsRead.__executeServer(opts));
const markNotificationsRead = createServerFn({
  method: "POST"
}).handler(markNotificationsRead_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    throw new Error("Please log in to update notifications.");
  }
  markUserNotificationsRead(viewer.id, viewer.role);
});
const clearNotifications_createServerFn_handler = createServerRpc({
  id: "cf6c7a846eb399b5fce248e1b1973906faf891dc04c7cdefd0db732ded84c101",
  name: "clearNotifications",
  filename: "src/client/notifications.tsx"
}, (opts) => clearNotifications.__executeServer(opts));
const clearNotifications = createServerFn({
  method: "POST"
}).handler(clearNotifications_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    throw new Error("Please log in to clear notifications.");
  }
  clearUserNotifications(viewer.id, viewer.role);
});
const updateBrowserNotifications_createServerFn_handler = createServerRpc({
  id: "e0c85f1131201062c5b88ab1131561692d37ca7915f418c4705f581ad85ddb77",
  name: "updateBrowserNotifications",
  filename: "src/client/notifications.tsx"
}, (opts) => updateBrowserNotifications.__executeServer(opts));
const updateBrowserNotifications = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateBrowserNotifications_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer) {
    throw new Error("Please log in to update notifications.");
  }
  return updateUserNotificationPreferencesByUserId({
    userId: viewer.id,
    browserNotificationsEnabled: data.enabled,
    projectActivityNotificationsEnabled: data.enabled
  });
});
export {
  clearNotifications_createServerFn_handler,
  getNotificationsPageData_createServerFn_handler,
  markNotificationsRead_createServerFn_handler,
  updateBrowserNotifications_createServerFn_handler
};
