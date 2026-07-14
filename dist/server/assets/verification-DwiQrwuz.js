import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { a as getProfessionalVerificationByUserId, b as upsertProfessionalVerification } from "./pro-verification-db.server-qgjePjSa.js";
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
const getVerificationPage_createServerFn_handler = createServerRpc({
  id: "38e4caa85870d2b011787db77ba991ad42b78eece051c99b92d28accc79e7e34",
  name: "getVerificationPage",
  filename: "src/professional/verification.tsx"
}, (opts) => getVerificationPage.__executeServer(opts));
const getVerificationPage = createServerFn({
  method: "GET"
}).handler(getVerificationPage_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return null;
  }
  return {
    viewer,
    verification: getProfessionalVerificationByUserId(viewer.id)
  };
});
const saveVerificationDocument_createServerFn_handler = createServerRpc({
  id: "221f7999531e9ffd902d29b3f85e75eda20ade33378579e143f61defc4e53495",
  name: "saveVerificationDocument",
  filename: "src/professional/verification.tsx"
}, (opts) => saveVerificationDocument.__executeServer(opts));
const saveVerificationDocument = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(saveVerificationDocument_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "PROFESSIONAL") {
    return {
      ok: false,
      formError: "Only professional accounts can save verification documents."
    };
  }
  const current = getProfessionalVerificationByUserId(viewer.id);
  const next = {
    ...current,
    [data.key]: data.key === "certifications" ? [data.value] : data.value
  };
  const verification = upsertProfessionalVerification({
    userId: viewer.id,
    governmentIdUrl: next.governmentIdUrl,
    licenseUrl: next.licenseUrl,
    certifications: next.certifications,
    insuranceUrl: next.insuranceUrl,
    selfieUrl: next.selfieUrl
  });
  return {
    ok: true,
    verification
  };
});
export {
  getVerificationPage_createServerFn_handler,
  saveVerificationDocument_createServerFn_handler
};
