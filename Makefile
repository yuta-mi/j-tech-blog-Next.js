# J-Tech Blog - Docker Management

.PHONY: dev dev-d prod build stop clean logs shell install test help

# 開発環境（フォアグラウンド）
dev:
	docker compose -f docker-compose.dev.yml up --build

# 開発環境（バックグラウンド）
dev-d:
	docker compose -f docker-compose.dev.yml up -d --build

# 本番環境
prod:
	docker compose -f docker-compose.prod.yml up -d --build

# コンテナ停止
stop:
	docker compose -f docker-compose.dev.yml down

# ログ表示
logs:
	docker compose -f docker-compose.dev.yml logs -f

# コンテナシェルに入る
shell:
	docker compose -f docker-compose.dev.yml exec j-tech-blog sh

# クリーンアップ
clean:
	docker compose -f docker-compose.dev.yml down -v
	docker system prune -f

# ヘルプ表示
help:
	@echo "利用可能なコマンド:"
	@echo "  dev     - 開発環境を起動（フォアグラウンド）"
	@echo "  dev-d   - 開発環境を起動（バックグラウンド）"
	@echo "  prod    - 本番環境を起動"
	@echo "  stop    - コンテナを停止"
	@echo "  logs    - ログを表示"
	@echo "  shell   - コンテナに入る"
	@echo "  clean   - 完全クリーンアップ"
