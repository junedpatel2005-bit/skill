import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { a1 as getUserNotifications, a0 as getUserNotificationPreferences } from "../server.js";
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
const getNotificationSnapshot_createServerFn_handler = createServerRpc({
  id: "47ad464b6b0b07fa3ee9d80b2e3474c6d1faa7c83291e440ab9d7ca5511c8fb4",
  name: "getNotificationSnapshot",
  filename: "src/components/AppShell.tsx"
}, (opts) => getNotificationSnapshot.__executeServer(opts));
const getNotificationSnapshot = createServerFn({
  method: "GET"
}).handler(getNotificationSnapshot_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return {
      viewerId: null,
      viewerRole: null,
      unreadCount: 0,
      latest: null,
      unread: [],
      preferences: {
        emailNotificationsEnabled: true,
        browserNotificationsEnabled: false,
        projectActivityNotificationsEnabled: true
      }
    };
  }
  const notifications = getUserNotifications(viewer.id, viewer.role);
  const preferences = getUserNotificationPreferences(viewer.id);
  const unread = notifications.filter((notification) => !notification.readAt);
  return {
    viewerId: viewer.id,
    viewerRole: viewer.role,
    unreadCount: unread.length,
    latest: unread[0] ?? notifications[0] ?? null,
    unread: unread.slice(0, 100),
    preferences
  };
});
const getRealtimeViewer_createServerFn_handler = createServerRpc({
  id: "2080a9744ef24ed1f2349176327a3f409d884f7adb9f61528d71686ec276c885",
  name: "getRealtimeViewer",
  filename: "src/components/AppShell.tsx"
}, (opts) => getRealtimeViewer.__executeServer(opts));
const getRealtimeViewer = createServerFn({
  method: "GET"
}).handler(getRealtimeViewer_createServerFn_handler, async () => getCurrentUser());
const loadNotificationPanelData_createServerFn_handler = createServerRpc({
  id: "3663e1dcb3d83c2308c4233fc773cfd0b41d86e50aee0505ca87d4d9743e05b4",
  name: "loadNotificationPanelData",
  filename: "src/components/AppShell.tsx"
}, (opts) => loadNotificationPanelData.__executeServer(opts));
const loadNotificationPanelData = createServerFn({
  method: "GET"
}).handler(loadNotificationPanelData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return {
      notifications: []
    };
  }
  const notifications = getUserNotifications(viewer.id, viewer.role);
  return {
    notifications: notifications.slice(0, 3)
  };
});
export {
  getNotificationSnapshot_createServerFn_handler,
  getRealtimeViewer_createServerFn_handler,
  loadNotificationPanelData_createServerFn_handler
};
