import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { O as getOpenClientJobs } from "../server.js";
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
const getHomeData_createServerFn_handler = createServerRpc({
  id: "fdd2792a2c24c834517782fc4c0a485940ed26d7156272db363b023a115fd9b1",
  name: "getHomeData",
  filename: "src/professional/for-professionals.tsx"
}, (opts) => getHomeData.__executeServer(opts));
const getHomeData = createServerFn({
  method: "GET"
}).handler(getHomeData_createServerFn_handler, async () => {
  return {
    openJobs: getOpenClientJobs()
  };
});
export {
  getHomeData_createServerFn_handler
};
