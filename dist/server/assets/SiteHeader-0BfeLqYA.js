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
const getSiteHeaderUser_createServerFn_handler = createServerRpc({
  id: "47ad1f1e83a28c5c50411a048bd05de7a364ac9e0ca0cb9a48b4b93ea90f3f09",
  name: "getSiteHeaderUser",
  filename: "src/components/SiteHeader.tsx"
}, (opts) => getSiteHeaderUser.__executeServer(opts));
const getSiteHeaderUser = createServerFn({
  method: "GET"
}).handler(getSiteHeaderUser_createServerFn_handler, async () => getCurrentUser());
export {
  getSiteHeaderUser_createServerFn_handler
};
