import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { r as requireCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { c as clientProfileSchema } from "./client-profile-B1xUUnTZ.js";
import { I as getClientProfileByUserId, v as findUserByEmailOrPhone, ak as updateClientProfileByUserId } from "../server.js";
import { b as createServerFn } from "./server-B8npIiGW.js";
import "zod";
import "node:crypto";
import "node:fs/promises";
import "node:path";
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
const getProfileSetupData_createServerFn_handler = createServerRpc({
  id: "b4a2717c635ee7c0de3686b24148eb32a359e67ad4d41dffe205a24774bc4ff8",
  name: "getProfileSetupData",
  filename: "src/client/profile-setup.tsx"
}, (opts) => getProfileSetupData.__executeServer(opts));
const getProfileSetupData = createServerFn({
  method: "GET"
}).handler(getProfileSetupData_createServerFn_handler, async () => {
  const viewer = requireCurrentUser();
  const clientProfile = viewer.role === "CLIENT" ? getClientProfileByUserId(viewer.id) : null;
  return {
    viewer,
    clientProfile
  };
});
const saveClientProfile_createServerFn_handler = createServerRpc({
  id: "543235704210eeb04c5cc7ffe5ad97072b66baab0cada240c42d7d12da4e8f35",
  name: "saveClientProfile",
  filename: "src/client/profile-setup.tsx"
}, (opts) => saveClientProfile.__executeServer(opts));
const saveClientProfile = createServerFn({
  method: "POST"
}).inputValidator((data) => clientProfileSchema.parse(data)).handler(saveClientProfile_createServerFn_handler, async ({
  data
}) => {
  const viewer = requireCurrentUser();
  if (viewer.role !== "CLIENT") {
    return {
      ok: false,
      formError: "Only client accounts can save this onboarding flow."
    };
  }
  const normalizedEmail = data.email.trim().toLowerCase();
  const normalizedPhone = data.phone.trim();
  const existingUser = findUserByEmailOrPhone(normalizedEmail, normalizedPhone);
  if (existingUser && existingUser.id !== viewer.id) {
    return {
      ok: false,
      formError: existingUser.email === normalizedEmail ? "This email address is already registered." : "This phone number is already registered."
    };
  }
  const profile = updateClientProfileByUserId({
    userId: viewer.id,
    fullName: data.fullName,
    email: normalizedEmail,
    phone: normalizedPhone,
    companyName: data.companyName,
    companyWebsite: data.companyWebsite || null,
    industry: data.industry,
    teamSize: data.teamSize,
    companyDescription: data.companyDescription,
    address: data.address,
    avatarUrl: data.profilePhotoUrl || void 0,
    savedLocations: data.savedLocations,
    hiringNeeds: data.hiringNeeds
  });
  return {
    ok: true,
    profile
  };
});
export {
  getProfileSetupData_createServerFn_handler,
  saveClientProfile_createServerFn_handler
};
