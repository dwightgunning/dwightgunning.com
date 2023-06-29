import { z, defineCollection } from 'astro:content';

const OutdoorsPagesCollection = defineCollection({
  schema: z.object({
    activityDate: z.date().optional(),
    draft: z.boolean(),
    introduction: z.string(),
    label: z.string(),
    tags: z.array(z.string()),
    map: z.object({
      fullsize: z.object({
        mapCenterDefault: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
        mapZoomDefault: z.number(),
      }),
      thumbnail: z.object({
        mapCenterDefault: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
        mapZoomDefault: z.number(),
      }),
      tracks: z.array(z.string()),
    }),
    publishedAt: z.date().optional(),
    title: z.string(),
    type: z.enum(['Hiking', 'Running', 'Camping']),
    wikipedia: z.string().optional(),
    updatedAt: z.date().optional(),
  }),
});

export const collections = {
  outdoors: OutdoorsPagesCollection,
};
