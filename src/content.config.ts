import { defineCollection, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { outdoorsSchema } from './content/outdoorsSchema';

export { outdoorsSchema } from './content/outdoorsSchema';

const outdoorsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/outdoors' }),
  schema: (ctx: SchemaContext) => outdoorsSchema(ctx),
});

export const collections = {
  outdoors: outdoorsCollection,
};
