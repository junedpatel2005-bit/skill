import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { V as getProfessionalUsers, L as getFavoriteJobIds, O as getOpenClientJobs } from "../server.js";
import { a as getProfessionalVerificationByUserId } from "./pro-verification-db.server-qgjePjSa.js";
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
const getCurrentUserFn_createServerFn_handler = createServerRpc({
  id: "50c70bc07b503c6662e88c80b6c6da6d6dc2e14b88aab95aee2e3aa832bea6fe",
  name: "getCurrentUserFn",
  filename: "src/routes/index.tsx"
}, (opts) => getCurrentUserFn.__executeServer(opts));
const getCurrentUserFn = createServerFn({
  method: "GET"
}).handler(getCurrentUserFn_createServerFn_handler, async () => {
  const user = getCurrentUser();
  return user;
});
const getHomeData_createServerFn_handler = createServerRpc({
  id: "e5d3f5d948391b170b648653d55968324eb90a864ee693154a5ada87efb58755",
  name: "getHomeData",
  filename: "src/routes/index.tsx"
}, (opts) => getHomeData.__executeServer(opts));
const getHomeData = createServerFn({
  method: "GET"
}).handler(getHomeData_createServerFn_handler, async () => {
  const user = getCurrentUser();
  const {
    getPublishedWebsitePage
  } = await import("../server.js").then((n) => n.az);
  const editorPage = getPublishedWebsitePage("home");
  return {
    homeIntroHtml: editorPage ? extractFirstSection(editorPage.content) : null,
    openJobs: getOpenClientJobs(),
    favoriteJobIds: user ? getFavoriteJobIds(user.id) : [],
    professionals: getProfessionalUsers().map((professional) => ({
      ...professional,
      verification: getProfessionalVerificationByUserId(professional.id)
    }))
  };
});
function extractFirstSection(content) {
  const section = content.match(/<section\b[\s\S]*?<\/section>/i)?.[0];
  return section || content;
}
export {
  getCurrentUserFn_createServerFn_handler,
  getHomeData_createServerFn_handler
};
