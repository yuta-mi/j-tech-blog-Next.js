# ブログダイナミックルーティング エラー修正ログ

**日付**: 2024年12月23日  
**対象ファイル**: `src/app/blogs/[id]/page.tsx`

## エラー内容

```
Error: Route "/blogs/[id]" used `params.id`. `params` should be awaited before using its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis
    at Module.generateMetadata (src/app/blogs/[id]/page.tsx:114:50)
```

## 原因

Next.js 15以降では、動的ルートの`params`は`Promise`型になり、使用前に`await`する必要があります。

## 修正内容

### 1. 型定義の修正

**修正前:**
```typescript
interface PageProps {
  params: {
    id: string;
  };
}
```

**修正後:**
```typescript
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
```

### 2. メインコンポーネントでの修正

**修正前:**
```typescript
export default async function BlogDetailPage({ params }: PageProps) {
  try {
    const blog = await getMicroCMSBlogById(params.id);
    // ...
```

**修正後:**
```typescript
export default async function BlogDetailPage({ params }: PageProps) {
  try {
    const { id } = await params;
    const blog = await getMicroCMSBlogById(id);
    // ...
```

### 3. generateMetadata関数での修正

**修正前:**
```typescript
export async function generateMetadata({ params }: PageProps) {
  try {
    const blog = await getMicroCMSBlogById(params.id);
    // ...
```

**修正後:**
```typescript
export async function generateMetadata({ params }: PageProps) {
  try {
    const { id } = await params;
    const blog = await getMicroCMSBlogById(id);
    // ...
```

## 修正結果

- エラーが解消され、Next.js 15の新しいAPIに対応
- ダイナミックルーティング `/blogs/[id]` が正常に動作
- SEOメタデータの生成も正常に動作

## 実装機能

- **個別ブログ記事表示**: microCMSから記事IDに基づいて記事を取得
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **SEO対応**: メタデータとOGタグの動的生成
- **ナビゲーション**: 記事一覧への戻るリンク
- **エラーハンドリング**: 存在しない記事の場合は404ページ表示

## 使用技術

- Next.js 15 App Router
- TypeScript
- microCMS API
- Tailwind CSS
- React Server Components 