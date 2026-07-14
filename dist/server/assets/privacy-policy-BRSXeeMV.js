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
const loadPrivacyPage_createServerFn_handler = createServerRpc({
  id: "aa570f29499fd324ade1a4bebcdf028039d509b20f350df4392626c54629c4d9",
  name: "loadPrivacyPage",
  filename: "src/routes/privacy-policy.tsx"
}, (opts) => loadPrivacyPage.__executeServer(opts));
const loadPrivacyPage = createServerFn({
  method: "GET"
}).handler(loadPrivacyPage_createServerFn_handler, async () => {
  const {
    getPublishedLegalPageBySlug
  } = await import("./legal-cms.server-CFOZocwu.js");
  return {
    cmsPage: getPublishedLegalPageBySlug("privacy-policy") || null
  };
});
export {
  loadPrivacyPage_createServerFn_handler
};
