import { ToolCase } from "lucide-react";
import { defineField, defineType } from "sanity";

export const tool = defineType({
    name: 'tool',
    title: 'Tool',
    type: 'document',
    icon: ToolCase,
    groups: [
        {name: 'seo', title: 'Seo'},
        {name: 'content', title: 'Content'}
    ],
    fields: [
        defineField({
            name: 'seo',
            title: 'Seo',
            type: 'seo',
            group: 'seo',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            group: 'content',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
            group: 'content',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'content',
            title: "Content",
            type: 'blockContent',
            group: 'content',
            validation: (Rule) => Rule.required()
        }),
    ]
})