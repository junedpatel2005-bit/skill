import { jsx, jsxs } from "react/jsx-runtime";
import { A as AppShell, T as Textarea, s as createSsrRpc } from "./router-CCfZqKWO.js";
import { useLoaderData, useRouter, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { B as Button } from "./button-TjZkfKyC.js";
import { I as Input } from "./input-C0QjszdI.js";
import { R as ReportExportActions } from "./ReportExportActions-BC1o5kJ9.js";
import { b as createServerFn } from "./server-B8npIiGW.js";
import "@tanstack/react-query";
import "react-redux";
import "sonner";
import "@reduxjs/toolkit";
import "lucide-react";
import "socket.io-client";
import "@hookform/resolvers/zod";
import "react-hook-form";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-slot";
import "@radix-ui/react-label";
import "class-variance-authority";
import "./select-DPaGlibP.js";
import "@radix-ui/react-select";
import "./client-profile-B1xUUnTZ.js";
import "zod";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slider";
import "../server.js";
import "node:crypto";
import "node:fs/promises";
import "node:path";
import "better-sqlite3";
import "nodemailer";
import "node:async_hooks";
import "h3-v2";
import "jsdom";
import "dompurify";
import "./forgot-password-D1FDXg_D.js";
import "@radix-ui/react-accordion";
import "@radix-ui/react-switch";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
const saveServiceCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("e6474fabb0c7002835fe9cf233562b70c976f1753e8258ac38019f98d7b13067"));
const removeServiceCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(createSsrRpc("576fe12dd784cc869a9ca756e2b212df90341c076f6142ed21f5ba66874fffc2"));
function AdminCategories() {
  const data = useLoaderData({
    from: "/admin-categories"
  });
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    iconName: "",
    sortOrder: 0
  });
  const categories = data.categories;
  const selectedCategory = useMemo(() => categories.find((category) => category.id === selectedId) ?? null, [categories, selectedId]);
  useEffect(() => {
    if (selectedCategory) {
      setCategoryForm({
        name: selectedCategory.name,
        slug: selectedCategory.slug,
        description: selectedCategory.description,
        iconName: selectedCategory.iconName,
        sortOrder: selectedCategory.sortOrder
      });
      return;
    }
    setCategoryForm({
      name: "",
      slug: "",
      description: "",
      iconName: "",
      sortOrder: 0
    });
  }, [selectedCategory]);
  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return categories;
    }
    return categories.filter((category) => [category.name, category.slug, category.description, category.iconName].join(" ").toLowerCase().includes(term));
  }, [categories, search]);
  const isEditing = selectedCategory !== null;
  const title = isEditing ? "Edit category" : "Create category";
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage(null);
    setIsSaving(true);
    try {
      await saveServiceCategory({
        data: {
          id: selectedCategory?.id,
          name: categoryForm.name,
          slug: categoryForm.slug,
          description: categoryForm.description,
          iconName: categoryForm.iconName,
          sortOrder: categoryForm.sortOrder
        }
      });
      await router.invalidate();
      setMessage("Category saved successfully.");
      if (!selectedCategory) {
        setSelectedId(null);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save category.");
    } finally {
      setIsSaving(false);
    }
  }
  async function handleDelete() {
    if (!selectedCategory) return;
    setMessage(null);
    setIsDeleting(true);
    try {
      await removeServiceCategory({
        data: {
          id: selectedCategory.id
        }
      });
      await router.invalidate();
      setSelectedId(null);
      setMessage("Category deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to delete category.");
    } finally {
      setIsDeleting(false);
    }
  }
  if (!data.viewer || data.viewer.role !== "ADMIN") {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-screen place-items-center bg-muted/30 px-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm rounded-lg border border-border bg-card p-6 text-center shadow-soft", children: [
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-xl font-semibold", children: "Admin access required" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Sign in from the admin panel to manage service categories." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-5 w-full", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Open admin panel" }) })
    ] }) });
  }
  const displayName = `${data.viewer.firstName} ${data.viewer.lastName}`.trim() || data.viewer.email;
  return /* @__PURE__ */ jsx(AppShell, { userName: displayName, userRole: "Admin", userAvatarUrl: data.viewer.avatarUrl, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-primary", children: "Admin / Categories" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-1 text-3xl font-semibold tracking-tight", children: "Service category manager" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Add, edit, and delete service categories used by the public services page." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx(ReportExportActions, { table: "ServiceCategory", reportName: "Admin categories export", variant: "outline" }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Back to admin" }) }),
        /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: () => {
          setSelectedId(null);
          setMessage(null);
        }, children: "New category" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 xl:grid-cols-[370px_1fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-4 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Categories" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
              categories.length,
              " categories in the database."
            ] })
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Admin" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Input, { value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search categories..." }) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: filteredCategories.length ? filteredCategories.map((category) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setSelectedId(category.id), className: `block w-full rounded-2xl border p-4 text-left transition-all hover:border-primary/60 hover:bg-primary/5 ${selectedId === category.id ? "border-primary bg-primary/5" : "border-border bg-background"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold", children: category.name }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: category.description })
            ] }),
            /* @__PURE__ */ jsxs(Badge, { variant: "outline", children: [
              category.jobCount,
              " jobs"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Slug: ",
              category.slug
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Icon: ",
              category.iconName || "None"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Sort order: ",
              category.sortOrder
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Pros: ",
              category.proCount
            ] })
          ] })
        ] }, category.id)) : /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground", children: "No categories match your search." }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-card p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: isEditing ? "Update existing category details." : "Create a new category record." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: isEditing ? /* @__PURE__ */ jsx(Button, { variant: "destructive", onClick: handleDelete, disabled: isDeleting, children: isDeleting ? "Deleting..." : "Delete" }) : null })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "category-name", children: "Name" }),
            /* @__PURE__ */ jsx(Input, { id: "category-name", value: categoryForm.name, onChange: (event) => setCategoryForm((current) => ({
              ...current,
              name: event.target.value
            })), required: true, className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "category-slug", children: "Slug" }),
            /* @__PURE__ */ jsx(Input, { id: "category-slug", value: categoryForm.slug, onChange: (event) => setCategoryForm((current) => ({
              ...current,
              slug: event.target.value
            })), className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "category-icon", children: "Icon name" }),
            /* @__PURE__ */ jsx(Input, { id: "category-icon", value: categoryForm.iconName, onChange: (event) => setCategoryForm((current) => ({
              ...current,
              iconName: event.target.value
            })), className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "category-sort-order", children: "Sort order" }),
            /* @__PURE__ */ jsx(Input, { id: "category-sort-order", type: "number", value: categoryForm.sortOrder ?? 0, onChange: (event) => setCategoryForm((current) => ({
              ...current,
              sortOrder: Number(event.target.value) || 0
            })), className: "mt-2" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium", htmlFor: "category-description", children: "Description" }),
            /* @__PURE__ */ jsx(Textarea, { id: "category-description", value: categoryForm.description, onChange: (event) => setCategoryForm((current) => ({
              ...current,
              description: event.target.value
            })), className: "mt-2 h-32" })
          ] }),
          message ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: message }) : null,
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSaving, children: isSaving ? "Saving..." : isEditing ? "Save changes" : "Create category" }),
            /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => {
              setSelectedId(null);
              setMessage(null);
            }, children: "Clear" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  AdminCategories as component
};
