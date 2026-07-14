import "react/jsx-runtime";
import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import "./input-C0QjszdI.js";
import "./select-DPaGlibP.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { z as getAdminEarningsReport, ah as updateAdminPayoutStatus } from "../server.js";
import { b as createServerFn } from "./server-B8npIiGW.js";
import "react";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-select";
import "lucide-react";
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
import "@tanstack/react-router";
import "@tanstack/react-router/ssr/server";
const getEarningsReportsData_createServerFn_handler = createServerRpc({
  id: "f108177aa08367938e52b83bddcc36fd4b131fcfe5a95865744a3cb3f9976718",
  name: "getEarningsReportsData",
  filename: "src/routes/earnings-reports.tsx"
}, (opts) => getEarningsReportsData.__executeServer(opts));
const getEarningsReportsData = createServerFn({
  method: "GET"
}).handler(getEarningsReportsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    return {
      viewer,
      report: null
    };
  }
  return {
    viewer,
    report: getAdminEarningsReport()
  };
});
const updatePayoutReviewStatus_createServerFn_handler = createServerRpc({
  id: "d7a541c7e5704b9aa7e159708b81abd37fbd1a93c5c947fea36e447fdc291d62",
  name: "updatePayoutReviewStatus",
  filename: "src/routes/earnings-reports.tsx"
}, (opts) => updatePayoutReviewStatus.__executeServer(opts));
const updatePayoutReviewStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updatePayoutReviewStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can update payout status.");
  }
  return updateAdminPayoutStatus(data.payoutId, data.status);
});
export {
  getEarningsReportsData_createServerFn_handler,
  updatePayoutReviewStatus_createServerFn_handler
};
