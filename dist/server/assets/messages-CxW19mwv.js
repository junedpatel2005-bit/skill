import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { b as createServerFn } from "./server-B8npIiGW.js";
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
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const getClientMessagesPage_createServerFn_handler = createServerRpc({
  id: "8bcb83b2ac36f74a5f33ec892c4b41348990edcd59ee70b521aefd68bf37407f",
  name: "getClientMessagesPage",
  filename: "src/client/messages.tsx"
}, (opts) => getClientMessagesPage.__executeServer(opts));
const getClientMessagesPage = createServerFn({
  method: "GET"
}).handler(getClientMessagesPage_createServerFn_handler, async () => ({
  viewer: getCurrentUser()
}));
export {
  getClientMessagesPage_createServerFn_handler
};
