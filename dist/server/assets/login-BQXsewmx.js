import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { ay as verifyPassword, a3 as hashPassword, ad as setResponseHeader, o as createSessionCookie } from "../server.js";
import { l as loginSchema } from "./login-5WaxsvPC.js";
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
const submitLogin_createServerFn_handler = createServerRpc({
  id: "89f524fd6c5bf85e111a57c758b432358c7d12e411e9b7863b6f9428c6f137e5",
  name: "submitLogin",
  filename: "src/routes/login.tsx"
}, (opts) => submitLogin.__executeServer(opts));
const submitLogin = createServerFn({
  method: "POST"
}).inputValidator((data) => loginSchema.parse(data)).handler(submitLogin_createServerFn_handler, async ({
  data
}) => {
  try {
    const {
      findUserByEmail,
      recordUserLogin
    } = await import("../server.js").then((n) => n.ax);
    const email = data.email.trim().toLowerCase();
    const user = findUserByEmail(email);
    if (!user) {
      return {
        ok: false,
        fieldErrors: {
          email: "No account found for that email."
        },
        formError: null
      };
    }
    if (!user.isActive) {
      return {
        ok: false,
        fieldErrors: {
          email: "This account is disabled. Contact an administrator."
        },
        formError: null
      };
    }
    if (!user.passwordHash) {
      return {
        ok: false,
        fieldErrors: {
          email: user.googleId ? "This account uses Google sign-in. Continue with Google instead." : "This account does not have a password yet."
        },
        formError: null
      };
    }
    const passwordCheck = await verifyPassword(data.password, user.passwordHash);
    if (!passwordCheck.valid) {
      return {
        ok: false,
        fieldErrors: {
          password: "Incorrect password."
        },
        formError: null
      };
    }
    if (passwordCheck.needsUpgrade) {
      const {
        updateUserPasswordByEmail
      } = await import("../server.js").then((n) => n.ax);
      updateUserPasswordByEmail(email, hashPassword(data.password));
    }
    recordUserLogin(user.id);
    setResponseHeader("Set-Cookie", createSessionCookie({
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      authProvider: user.authProvider
    }));
    return {
      ok: true,
      user: {
        id: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        authProvider: user.authProvider
      }
    };
  } catch (error) {
    console.error("Login server action failed:", error);
    return {
      ok: false,
      fieldErrors: {},
      formError: error instanceof Error ? error.message : "Unknown server error"
    };
  }
});
export {
  submitLogin_createServerFn_handler
};
