import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

export const outdoorsSchema = ({ image }: SchemaContext) =>
  z.object({
    activityDate: z.date().optional(),
    draft: z.boolean(),
    introduction: z.string(),
    label: z.string(),
    metaDescription: z.string(),
    map: z.object({
      fullsize: z.object({
        image: image(),
        mapCenterDefault: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
        mapZoomDefault: z.number(),
      }),
      thumbnail: z.object({
        image: image(),
        mapCenterDefault: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
        mapZoomDefault: z.number(),
      }),
      tracks: z.array(z.string()),
    }),
    photos: z
      .record(
        z.string(),
        z.object({
          img: image(),
          alt: z.string(),
        }),
      )
      .optional(),
    publishedAt: z.date().optional(),
    tags: z.array(z.string()),
    title: z.string(),
    type: z.enum(['hiking', 'running', 'camping']),
    wikipedia: z.string().optional(),
    alltrails: z.string().optional(),
    wikiloc: z.string().optional(),
    updatedAt: z.date().optional(),
  });

const outdoorsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/outdoors' }),
  schema: outdoorsSchema,
});

export const collections = {
  outdoors: outdoorsCollection,
};
