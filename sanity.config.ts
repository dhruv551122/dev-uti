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
        { label: "Deep Bright Red", value: "#ab0101" },
        { label: "Nero", value: "#170504" },
        { label: "Ivory", value: "#f8f4ef" },
        { label: "Dark", value: "#111111" },
        { label: "Deep Burgundy", value: "#5a0b18" },
        { label: "Dark Charcoal Gray", value: "#2e2e2e" },
        { label: "Light Gray", value: "#d9d5d1" },
      ],
      enableSearch: true,
      showColorValue: true,
    }),
    
  ],
});
