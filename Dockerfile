# --- build stage ---
    FROM node:20 AS builder
    WORKDIR /app
    
    # 依存関係だけ先にコピーしてインストール（キャッシュ有効）
    COPY package*.json ./
    RUN npm ci
    
    # ソースをコピーしてビルド
    COPY . .
    # ビルド時に渡す ARG（デフォルトを設定しておく）
    ARG VITE_API_BASE_URL=/
    ARG VITE_BASE_URL=/
    # Vite が参照する環境変数は VITE_ プレフィックスにすること
    ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
    ENV VITE_BASE_URL=${VITE_BASE_URL}
    COPY .env.production .env.production
    RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env.production

    RUN npm run build
    
    # --- production stage ---
    FROM nginx:stable-alpine AS production
    WORKDIR /usr/share/nginx/html
    
    # builder の dist（Vite 出力）をコピー
    COPY --from=builder /app/dist/ .
    
    # カスタム nginx 設定を上書き
    COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 8080
    # デフォルトの CMD のまま (nginx -g 'daemon off;')