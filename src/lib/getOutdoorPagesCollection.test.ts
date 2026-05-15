import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { CollectionEntry } from 'astro:content';

vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));

import { getCollection } from 'astro:content';
import getOutdoorPagesCollection from './getOutdoorPagesCollection';

const mockGetCollection = vi.mocked(getCollection);

type FilterFn = (entry: { data: { draft: boolean } }) => boolean;

function makeEntry(overrides: {
  id?: string;
  draft?: boolean;
  activityDate?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}): CollectionEntry<'outdoors'> {
  return {
    id: overrides.id ?? 'test-entry',
    collection: 'outdoors',
    data: {
      draft: overrides.draft ?? false,
      activityDate: overrides.activityDate,
      updatedAt: overrides.updatedAt,
      publishedAt: overrides.publishedAt,
    },
  } as unknown as CollectionEntry<'outdoors'>;
}

beforeEach(() => {
  vi.unstubAllEnvs();
  mockGetCollection.mockReset();
});

describe('getOutdoorPagesCollection', () => {
  it('filters out draft entries when DRAFT_MODE is not set', async () => {
    const published = makeEntry({ id: 'published', draft: false });
    const draft = makeEntry({ id: 'draft', draft: true });

    mockGetCollection.mockImplementation(async (_collection, filter) => {
      return [published, draft].filter((e) => (filter as FilterFn)(e));
    });

    const result = await getOutdoorPagesCollection();
    expect(result.map((e) => e.id)).toEqual(['published']);
  });

  it('includes draft entries when DRAFT_MODE=1', async () => {
    vi.stubEnv('DRAFT_MODE', '1');
    const published = makeEntry({ id: 'published', draft: false });
    const draft = makeEntry({ id: 'draft', draft: true });

    mockGetCollection.mockImplementation(async (_collection, filter) => {
      return [published, draft].filter((e) => (filter as FilterFn)(e));
    });

    const result = await getOutdoorPagesCollection();
    const ids = result.map((e) => e.id);
    expect(ids).toContain('draft');
    expect(ids).toContain('published');
  });

  it('sorts by activityDate descending', async () => {
    const entries = [
      makeEntry({ id: 'old', activityDate: new Date('2021-01-01') }),
      makeEntry({ id: 'new', activityDate: new Date('2023-06-01') }),
      makeEntry({ id: 'mid', activityDate: new Date('2022-03-15') }),
    ];
    mockGetCollection.mockResolvedValue(entries);

    const result = await getOutdoorPagesCollection();
    expect(result.map((e) => e.id)).toEqual(['new', 'mid', 'old']);
  });

  it('falls back to updatedAt when activityDate is absent', async () => {
    const entries = [
      makeEntry({ id: 'a', updatedAt: new Date('2021-01-01') }),
      makeEntry({ id: 'b', updatedAt: new Date('2023-01-01') }),
    ];
    mockGetCollection.mockResolvedValue(entries);

    const result = await getOutdoorPagesCollection();
    expect(result[0]!.id).toBe('b');
    expect(result[1]!.id).toBe('a');
  });

  it('falls back to publishedAt when activityDate and updatedAt are absent', async () => {
    const entries = [
      makeEntry({ id: 'early', publishedAt: new Date('2020-01-01') }),
      makeEntry({ id: 'late', publishedAt: new Date('2024-01-01') }),
    ];
    mockGetCollection.mockResolvedValue(entries);

    const result = await getOutdoorPagesCollection();
    expect(result[0]!.id).toBe('late');
    expect(result[1]!.id).toBe('early');
  });

  it('does not crash when entries have no date fields', async () => {
    const entries = [makeEntry({ id: 'nodates' })];
    mockGetCollection.mockResolvedValue(entries);

    await expect(getOutdoorPagesCollection()).resolves.toHaveLength(1);
  });
});
