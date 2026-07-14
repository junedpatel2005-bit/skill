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
const getAdminReportsData_createServerFn_handler = createServerRpc({
  id: "786f5101632b203af0eb28be1fb4d679269c74691401ec1b6b449a8edd3067a1",
  name: "getAdminReportsData",
  filename: "src/routes/admin-reports.tsx"
}, (opts) => getAdminReportsData.__executeServer(opts));
const getAdminReportsData = createServerFn({
  method: "GET"
}).handler(getAdminReportsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Not authorized");
  }
  return {
    viewer
  };
});
export {
  getAdminReportsData_createServerFn_handler
};
