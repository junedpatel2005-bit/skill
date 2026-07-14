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
const getAuthLayoutUser_createServerFn_handler = createServerRpc({
  id: "951c17a8842f1d7cb860c1d26decee12b7759ebea0e564cb42cf8b06b2fa6f96",
  name: "getAuthLayoutUser",
  filename: "src/components/AuthLayout.tsx"
}, (opts) => getAuthLayoutUser.__executeServer(opts));
const getAuthLayoutUser = createServerFn({
  method: "GET"
}).handler(getAuthLayoutUser_createServerFn_handler, async () => getCurrentUser());
export {
  getAuthLayoutUser_createServerFn_handler
};
