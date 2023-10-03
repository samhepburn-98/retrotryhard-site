import { defineField, defineType } from "sanity";

export default defineType({
    name: "roll",
    title: "Roll",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string"
        }),
        defineField({
            name: "index",
            title: "Index",
            type: "number"
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        }),
        defineField({
            name: "mainImage",
            title: "Main image",
            type: "image"
        }),
        defineField({
            name: "frames",
            title: "Frames",
            type: "array",
            of: [{ type: "image" }],
        }),
        defineField({
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "blockContent",
        }),
    ],

    preview: {
        select: {
            title: "title",
            frames: "frames",
            media: "mainImage",
        },
        prepare(selection) {
            const { frames } = selection;
            return { ...selection, subtitle: frames && `${frames.length} Frames` };
        },
    },
});
