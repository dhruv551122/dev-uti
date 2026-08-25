import { PenToolIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const terms = defineType({
  name: "terms",
  title: "Terms",
  type: "document",
  icon: PenToolIcon,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "content", title: "Content" },
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
      name: "termsTitle",
      title: "Terms Title",
      type: "blockContent",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "termsContent",
      title: "Terms Content",
      type: "blockContent",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Terms | Placeaa",
      };
    },
  },
});
