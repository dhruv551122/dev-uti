import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: Settings,
  groups: [
    { name: "header", title: "Header" },
    {
      name: "footer",
      title: "Footer",
    },
    { name: "stats", title: "Stats" },
  ],
  fields: [
    defineField({
      name: "headerLogoDark",
      title: "Header Logo Dark",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "header",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "headerLogoLight",
      title: "Header Logo Light",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "header",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "headerLinks",
      title: "Header Links",
      type: "array",
      of: [
        {
          type: "link",
        },
      ],
      group: "header",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headerButton",
      title: "Header Button",
      type: "link",
      group: "header",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerLogo",
      title: "Footer Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "footer",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "footerContent",
      title: "Footer Content",
      type: "blockContent",
      group: "footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerSocialLinks",
      title: "Footer Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required().assetRequired(),
            }),
            defineField({
              name: "platformName",
              title: "Plateform Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Url",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "platformName",
              media: "logo",
            },
          },
        },
      ],
      group: "footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerQuickLinks",
      title: "Footer Quick Links",
      type: "array",
      of: [
        {
          type: "link",
          validation: (Rule) => Rule.required(),
        },
      ],
      group: "footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerContactLinks",
      title: "Footer Contact Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required().assetRequired(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "link",
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
          preview: {
            select: {
              title: "link.label",
              media: "icon",
            },
          },
        },
      ],
      group: "footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerCopyrightText",
      title: "Footer Copyright Text",
      type: "blockContent",
      group: "footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerLegalLinks",
      title: "Footer Legal Links",
      type: "array",
      of: [
        {
          type: "link",
          validation: (Rule) => Rule.required(),
        },
      ],
      group: "footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "statsList",
      title: "Stats List",
      group: "stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required().assetRequired(),
            }),
            defineField({
              name: "value",
              title: "value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "valuePostfix",
              title: "Value Postfix",
              type: "string",
            }),
            defineField({
              name: "name",
              title: "name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Settings" };
    },
  },
});
