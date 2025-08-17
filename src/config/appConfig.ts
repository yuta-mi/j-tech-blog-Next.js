// src/config/app.config.ts
const appConfig = {
  api: {
    qiita: {
      baseUrl: 'https://qiita.com/api/v2',
      defaultUser: 'yuta-mi',
      itemsPerPage: 9,
      maxItemsPerPage: 100
    },
    github: {
      baseUrl: 'https://api.github.com',
      defaultRepo: 'your-repo'
    },
    microCMS: {
      baseUrl: 'https://yuta-blogs.microcms.io/api/v1/',
      domain: 'yuta-blogs',
      blog: {
        endpoint: 'blogs',
      },
      apiKey: process.env.MICROCMS_API_KEY,
      defaultThumbnail: '/images/default-thumbnail.png'
    }
  },
  ui: {
    theme: {
      colors: {
        primary: '#8B5CF6',
        secondary: '#EC4899'
      }
    },
    pagination: {
      defaultPageSize: 10
    }
  },
  cache: {
    revalidateTime: 3600 // 1時間
  }
}

export default appConfig