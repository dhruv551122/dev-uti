import { Contact } from "lucide-react";
import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: Contact,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "herobanner", title: "Herobanner" },
    { name: "form", title: "Form" },
    { name: "contactDetail", title: "Contact Detail" },
    { name: "stats", title: "Stats" },
    { name: "faqs", title: "FAQs" },
    { name: "preFooter", title: "Pre Footer" },
  ],
  fields: [
    defineField({
      name: "seo",
      title: "Seo",
      type: "seo",
      group: "seo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerHeading",
      title: "Herobanner Heading",
      type: "string",
      group: "herobanner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerTitle",
      title: "Herobanner Title",
      type: "blockContent",
      group: "herobanner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerDescription",
      title: "Herobanner Description",
      type: "blockContent",
      group: "herobanner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerBgImage",
      title: "Herobanner Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "herobanner",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "herobannerMobileBgImage",
      title: "Herobanner Mobile Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "herobanner",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "herobannerButtonList",
      title: "Herobanner Button List",
      type: "array",
      of: [{ type: "link", validation: (Rule) => Rule.required() }],
      group: "herobanner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerTags",
      title: "Herobanner Tags",
      type: "array",
      of: [{ type: "string", validation: (Rule) => Rule.required() }],
      group: "herobanner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "blockContent",
      group: "form",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formButtonLable",
      title: "Form Button Label",
      type: "string",
      group: "form",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "noteIcon",
      title: "Note Icon",
      type: "image",
      group: "form",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "note",
      title: "Note",
      type: "blockContent",
      group: "form",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactDetailTitle",
      title: "Contact Detail Title",
      type: "blockContent",
      group: "contactDetail",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactDetailItems",
      title: "Contact Detail Items",
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
        },
      ],
      group: "contactDetail",
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
    defineField({
      name: "faqsHeading",
      title: "FAQs Heading",
      type: "string",
      group: "faqs",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "faqsTitle",
      title: "FAQs Title",
      type: "blockContent",
      group: "faqs",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        {
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "blockContent",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question",
            },
          },
        },
      ],
      group: "faqs",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "preFooterBgImage",
      title: "Pre Footer Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "preFooter",
      validation: (Rule) => Rule.required().assetRequired(),
    }),
    defineField({
      name: "preFooterTitle",
      title: "Pre Footer Title",
      type: "blockContent",
      group: "preFooter",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "preFooterDescription",
      title: "Pre Footer Description",
      type: "blockContent",
      group: "preFooter",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "preFooterButton",
      title: "Pre Footer Button",
      type: "link",
      group: "preFooter",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
