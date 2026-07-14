import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
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
const loadTermsPage_createServerFn_handler = createServerRpc({
  id: "eea242dfecf25c3556aa69c07e2ff6fabb7fe636a68e719cc719b9a73f9007c0",
  name: "loadTermsPage",
  filename: "src/routes/terms-and-conditions.tsx"
}, (opts) => loadTermsPage.__executeServer(opts));
const loadTermsPage = createServerFn({
  method: "GET"
}).handler(loadTermsPage_createServerFn_handler, async () => {
  const {
    getPublishedLegalPageBySlug
  } = await import("./legal-cms.server-CFOZocwu.js");
  return {
    cmsPage: getPublishedLegalPageBySlug("terms-and-conditions") || null
  };
});
export {
  loadTermsPage_createServerFn_handler
};
