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
const getProfessionalMessagesPage_createServerFn_handler = createServerRpc({
  id: "caa7ea0460ff589ca14ad47e869b8dca5174757b5a6860c21cdb76719c13198c",
  name: "getProfessionalMessagesPage",
  filename: "src/professional/messages.tsx"
}, (opts) => getProfessionalMessagesPage.__executeServer(opts));
const getProfessionalMessagesPage = createServerFn({
  method: "GET"
}).handler(getProfessionalMessagesPage_createServerFn_handler, async () => ({
  viewer: getCurrentUser()
}));
export {
  getProfessionalMessagesPage_createServerFn_handler
};
