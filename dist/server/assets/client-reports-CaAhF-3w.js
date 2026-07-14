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
const getClientReportsData_createServerFn_handler = createServerRpc({
  id: "2114fbcd804606ec0ffa4509ea56beb9c77d12bf8af2b79accd1d13504827428",
  name: "getClientReportsData",
  filename: "src/routes/client-reports.tsx"
}, (opts) => getClientReportsData.__executeServer(opts));
const getClientReportsData = createServerFn({
  method: "GET"
}).handler(getClientReportsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Not authorized");
  }
  return {
    viewer
  };
});
export {
  getClientReportsData_createServerFn_handler
};
