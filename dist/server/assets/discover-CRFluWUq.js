import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { V as getProfessionalUsers } from "../server.js";
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
const getDiscoveryData_createServerFn_handler = createServerRpc({
  id: "eaf4203d0ffa702f7dd50fd5919dd499db4c8f0bd1f7d3f62adda621f9d6884a",
  name: "getDiscoveryData",
  filename: "src/client/discover.tsx"
}, (opts) => getDiscoveryData.__executeServer(opts));
const getDiscoveryData = createServerFn({
  method: "GET"
}).handler(getDiscoveryData_createServerFn_handler, async () => ({
  viewer: getCurrentUser(),
  professionals: getProfessionalUsers()
}));
export {
  getDiscoveryData_createServerFn_handler
};
