import { client } from "@/libs/microCMSclient";

const MICROCMS_FIELDS = {
  base: ['id', 'publishedAt', 'title'],
  category: ['category', 'category.id', 'category.name'],
  eyecatch: ['eyecatch', 'eyecatch.url', 'eyecatch.width', 'eyecatch.height'],
} as const;

type MicroCMSBlogData = {
  contents: 
  [{
    id: string;
    publishedAt: string;
    title: string;
    category: {
      id: string;
      name: string;
    };
    eyecatch: {
      url: string;
      width: number;
      height: number;
    }
  }]
}

const thumbnailFields = (): string => {
  return [
    ...MICROCMS_FIELDS.base,
    ...MICROCMS_FIELDS.category,
    ...MICROCMS_FIELDS.eyecatch,
  ].join(',');
};

export const getMicroCMSBlogData = async (): Promise<MicroCMSBlogData> => {
  return await client
      .get({
        endpoint: 'blogs',
        queries: {
          fields: thumbnailFields(),
        }
      })
      .then((res) => {
        return res;
      });
}