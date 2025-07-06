import { client } from "@/libs/microCMSclient";

const MICROCMS_FIELDS = {
  base: ['id', 'publishedAt', 'title'],
  category: ['category', 'category.id', 'category.name'],
  eyecatch: ['eyecatch', 'eyecatch.url', 'eyecatch.width', 'eyecatch.height'],
  content: ['content'],
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

// 個別ブログ記事の型定義を追加
type MicroCMSBlogDetail = {
  id: string;
  publishedAt: string;
  title: string;
  content: string;
  category: {
    id: string;
    name: string;
  };
  eyecatch: {
    url: string;
    width: number;
    height: number;
  }
}

const thumbnailFields = (): string => {
  return [
    ...MICROCMS_FIELDS.base,
    ...MICROCMS_FIELDS.category,
    ...MICROCMS_FIELDS.eyecatch,
  ].join(',');
};

// 個別ブログ記事用のフィールド定義
const detailFields = (): string => {
  return [
    ...MICROCMS_FIELDS.base,
    ...MICROCMS_FIELDS.category,
    ...MICROCMS_FIELDS.eyecatch,
    ...MICROCMS_FIELDS.content,
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

// 個別ブログ記事を取得する関数を追加
export const getMicroCMSBlogById = async (id: string): Promise<MicroCMSBlogDetail> => {
  return await client
      .get({
        endpoint: 'blogs',
        contentId: id,
        queries: {
          fields: detailFields(),
        }
      })
      .then((res) => {
        return res;
      });
}