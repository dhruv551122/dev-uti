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
      of: [{type:'image', validation: (Rule) => Rule.required()}],
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
      type: "string",
      group: "herobanner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerTitle",
      title: "Herobanner Title",
      type: "text",
      group: "herobanner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "herobannerDescription",
      title: "Herobanner Description",
      type: "text",
      group: "herobanner",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "expertiseTitle",
      title: "Expertise Title",
      type: "string",
      group: "expertise",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "expertiseDescription",
      title: "Expertise Description",
      type: "blockContent",
      group: "expertise",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "maskBaseImage",
      title: "Mask Base Image",
      type: "image",
      group: "expertise",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "maskingImage",
      title: "Masking Image",
      type: "image",
      group: "expertise",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "expertiseItems",
      title: "Expertise Items",
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
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "blockContent",
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
      group: "expertise",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "caseStudiesTitle",
    //   title: "Case Studies Title",
    //   type: "string",
    //   group: "caseStudies",
    //   validation: (RUle) => RUle.required(),
    // }),
    // defineField({
    //   name: "caseStudiesButton",
    //   title: "Case Studies Button",
    //   type: "link",
    //   group: "caseStudies",
    //   validation: (Rule) => Rule.required(),
    // }),
    // defineField({
    //   name: "caseStudies",
    //   title: "Case Studies",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: [{ type: "caseStudy" }],
    //       validation: (Rule) => Rule.required(),
    //     },
    //   ],
    //   validation: (Rule) => Rule.required(),
    // }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "content",
              title: "Content",
              type: "blockContent",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      group: "testimonials",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
