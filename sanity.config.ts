"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes, singletonType } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { media } from "sanity-plugin-media";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
import { structureTool } from "sanity/structure";

const singletonTypes = new Set<string>([...singletonType]);

const singletonActions = new Set<string>([
  "publish",
  "discardChanges",
  "restore",
]);

export default defineConfig({
  name: "developer-utility-tools",
  title: process.env.NEXT_PUBLIC_SITE_NAME,
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
    simplerColorInput({
      defaultColorFormat: "rgba",
      defaultColorList: [
        { label: "secondary", value: "#080e1c" },

        { label: "panel", value: "#0b1222" },
        { label: "panel-light", value: "#101a2e" },

        { label: "border", value: "#18243a" },
        { label: "border-light", value: "#24324c" },

        { label: "text-primary", value: "#f8fafc" },
        { label: "text-secondary", value: "#94a3b8" },
        { label: "text-muted", value: "#64748b" },

        { label: "green", value: "#39e58c" },
        { label: "cyan", value: "#22d3ee" },
        { label: "blue", value: "#3b82f6" },
        { label: "purple", value: "#a855f7" },
        { label: "pink", value: "#ec4899" },
        { label: "yellow", value: "#facc15" },
        { label: "rich-black", value: "#040A14" }
      ],
      enableSearch: true,
      showColorValue: true,
    }),

  ],
});
