import { getCollection } from 'astro:content';

export default async function getOutdoorPagesCollection() {
  return (
    await getCollection('outdoors', ({ data }) => parseInt(import.meta.env.DRAFT_MODE) === 1 || data.draft === false)
  ).sort(function (a, b) {
    const aComparatorDate: Date = a.data.activityDate || a.data.updatedAt || a.data.publishedAt || new Date();
    const bComparatorDate: Date = b.data.activityDate || b.data.updatedAt || b.data.publishedAt || new Date();
    return (aComparatorDate.getTime() - bComparatorDate.getTime()) * -1;
  });
}
