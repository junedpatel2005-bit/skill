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
const getProfessionalReportsData_createServerFn_handler = createServerRpc({
  id: "f522407dafc3847e81c19f552cdd8d1599c8f85d9d2f336df1bfcf1ec7902cca",
  name: "getProfessionalReportsData",
  filename: "src/routes/professional-reports.tsx"
}, (opts) => getProfessionalReportsData.__executeServer(opts));
const getProfessionalReportsData = createServerFn({
  method: "GET"
}).handler(getProfessionalReportsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    throw new Error("Not authorized");
  }
  return {
    viewer
  };
});
export {
  getProfessionalReportsData_createServerFn_handler
};
