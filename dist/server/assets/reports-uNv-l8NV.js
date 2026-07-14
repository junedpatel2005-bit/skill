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
const getReportsData_createServerFn_handler = createServerRpc({
  id: "900bb128350f2296e0f61f02a79dc7299cd447591d80524ec1c748722fb00a47",
  name: "getReportsData",
  filename: "src/routes/reports.tsx"
}, (opts) => getReportsData.__executeServer(opts));
const getReportsData = createServerFn({
  method: "GET"
}).handler(getReportsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  return {
    viewer
  };
});
export {
  getReportsData_createServerFn_handler
};
