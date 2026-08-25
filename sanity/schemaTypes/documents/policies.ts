import { LockKeyhole } from "lucide-react";
import { defineField, defineType } from "sanity";

export const policies = defineType({
  name: "privacyPolicies",
  title: "Privacy Policies",
  type: "document",
  icon: LockKeyhole,
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
      name: "policyTitle",
      title: "Policy Title",
      type: "blockContent",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "policyContent",
      title: "Policy Content",
      type: "blockContent",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Policies | Placeaa",
      };
    },
  },
});
