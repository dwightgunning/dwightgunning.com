import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { outdoorsSchema } from './outdoorsSchema';

// Mock the Astro image() helper as z.string() so the schema is testable
// without the Astro runtime. Image paths are validated as plain strings here;
// real ImageMetadata shape is covered by astro check at build time.
const schema = outdoorsSchema({ image: () => z.string() });

const validMap = {
  fullsize: {
    image: '/src/assets/fullsize.jpg',
    mapCenterDefault: { lat: 45.69, lng: -121.8 },
    mapZoomDefault: 12,
  },
  thumbnail: {
    image: '/src/assets/thumbnail.jpg',
    mapCenterDefault: { lat: 45.69, lng: -121.8 },
    mapZoomDefault: 10,
  },
  tracks: ['beacon-rock.gpx'],
};

const validEntry = {
  draft: false,
  introduction: 'A stunning hike in the Columbia River Gorge.',
  label: 'beacon-rock',
  metaDescription: 'Beacon Rock hike details.',
  map: validMap,
  publishedAt: new Date('2023-01-01'),
  tags: ['hiking', 'summit'],
  title: 'Beacon Rock',
  type: 'hiking' as const,
};

describe('outdoors content schema', () => {
  it('parses a valid full entry', () => {
    const result = schema.safeParse(validEntry);
    expect(result.success).toBe(true);
  });

  it('fails when draft field is missing', () => {
    const { draft: _draft, ...withoutDraft } = validEntry;
    const result = schema.safeParse(withoutDraft);
    expect(result.success).toBe(false);
  });

  it('fails when title is missing', () => {
    const { title: _title, ...withoutTitle } = validEntry;
    const result = schema.safeParse(withoutTitle);
    expect(result.success).toBe(false);
  });

  it('fails when type is not a valid enum value', () => {
    const result = schema.safeParse({ ...validEntry, type: 'cycling' });
    expect(result.success).toBe(false);
  });

  it('accepts all valid type enum values', () => {
    for (const type of ['hiking', 'running', 'camping'] as const) {
      const result = schema.safeParse({ ...validEntry, type });
      expect(result.success).toBe(true);
    }
  });

  it('parses when all optional fields are absent', () => {
    const minimal = {
      draft: false,
      introduction: 'Short intro.',
      label: 'test',
      metaDescription: 'Test.',
      map: validMap,
      tags: ['hiking'],
      title: 'Test',
      type: 'hiking',
    };
    const result = schema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it('accepts empty tags array (no minimum enforced)', () => {
    const result = schema.safeParse({ ...validEntry, tags: [] });
    expect(result.success).toBe(true);
  });

  it('accepts empty tracks array', () => {
    const result = schema.safeParse({
      ...validEntry,
      map: { ...validMap, tracks: [] },
    });
    expect(result.success).toBe(true);
  });

  it('accepts optional photo gallery when present', () => {
    const result = schema.safeParse({
      ...validEntry,
      photos: {
        'trailhead': { img: '/src/assets/photo.jpg', alt: 'Trailhead view' },
      },
    });
    expect(result.success).toBe(true);
  });

  it('accepts optional URL fields when present', () => {
    const result = schema.safeParse({
      ...validEntry,
      wikipedia: 'https://en.wikipedia.org/wiki/Beacon_Rock',
      alltrails: 'https://alltrails.com/trail/beacon-rock',
      wikiloc: 'https://wikiloc.com/beacon-rock',
    });
    expect(result.success).toBe(true);
  });
});
