import { Home } from "lucide-react";
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: Home,
  groups: [
    { name: "seo", title: "Seo" },
    { name: "herobanner", title: "Herobanner" },
    { name: "expertise", title: "Expertise" },
    // { name: "caseStudies", title: "Case Studies" },
    { name: "testimonials", title: "Testimonials" },
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
      name: "herobannerLeftImages",
      title: "Herobanner Top Left Images",
      type: "array",
      of: [{type:'image', validation: (Rule) => Rule.required().assetRequired()}],
      group: "herobanner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerRightImages",
      title: "Herobanner Top Right Images",
      type: "array",
      of: [{type:'image', validation: (Rule) => Rule.required()}],
      group: "herobanner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerHeading",
      title: "Herobanner Heading",
      type: "blockContent",
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
  ],
  preview: {
    select: {
      title: 'seo.seoTitle'
    }
  }
});
