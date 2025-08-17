# 統一Dockerfile - 開発・本番両対応
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies (dev dependencies included)
# 本番ビルド時は後でpruneする
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# デフォルトコマンドは設定せず、docker-composeで指定
