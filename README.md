# ✅ React + Typescript + Vite for Rails-API mode
1. ## 🟦Rails起動
    1. Docker DesktopをWindowsで起動する
    1. ターミナルよりdocker composeでRailsを起動する
        ```sh
        docker compose -f docker-compose.dev.yml up
        ```
1. ## 🟦DB作成
    1. Railsの内部にDBを作成する
        * これを実行しないとRailsの起動時にエラーとなる
        ```sh
        docker compose exec web bin/rails db:migrate
        ```
1. ## 🟦データ登録
    1. Railsにデーターを登録する
        ```sh
        docker compose exec web bin/rails db:seed
        ```
1. ## 🟦Login方法
    1. ### ユーザー登録する
        * __Advanced REST Client__ を起動しユーザーを登録する
        1. #### URLを設定する
            * `http://localhost:3000/v1/auth`
        1. #### Dataをjson形式で設定する
            ```json
            {
              "email": "xxxx@example.com",
              "password": "yyyyyy"
            }
            ```
        1. #### 送信する
            * `POST`を選択して ▶️ アイコンを押す
        1. #### 確認する
            * `Response`で `200` __OK__ を受信したことを確認する
    1. ### React起動
        1. Reactのディレクトリに移動する
            ```sh
            cd /home/＜ユーザー＞/react-rails
            ```
        1. Reactを起動する
            ```sh
            npm run dev
            ```
        1. Browserを起動する
    1. ### ログインする
        1. ブラウザより次のURLにアクセスする
            `http://localhost:5173/`
        1. 画面右上の`ログインページへ`を押す
        1. 表示されたログイン画面より登録したメールアドレス：`email`とパスワード：`password`でログインする

## デプロイ（Firebase Hosting）

静的ファイルは [Firebase Hosting](https://console.firebase.google.com/project/ishii-portfolio/hosting?authuser=1) が配信する。  
API（認証・スキル）はこれまでどおり Cloud Run の [rails-api](https://github.com/ishii-toshihiko/rails-api) を叩く。

プロジェクト ID は `.firebaserc` の `ishii-portfolio`。`firebase.json` の `public` は Vite の `dist`。`/about` などの直リンクは nginx の `try_files` 相当として、全パスを `index.html` へ rewrite する。

### ローカル確認

API は今までどおり Docker の Rails（`http://localhost:3000`）を使う。Hosting の SPA rewrite だけを見るときは、ビルド成果物を Firebase のエミュレータで開く。

```sh
cd /home/＜ユーザー＞/react-rails
npm ci
npm run build
firebase emulators:start --only hosting
```

エミュレータの URL（通常 `http://localhost:5000`）で Home が出ること、`/about` を直接開いても 404 にならないことを確認する。ログインとスキル取得は、`VITE_API_BASE_URL` がローカル Rails を向いているときにだけ行う。

`firebase deploy` は CI または明示的な本番反映のときだけ実行する。ローカル確認では使わない。

### 本番デプロイ（手動）

ビルド時に API URL が JS へ埋め込まれる。`VITE_API_BASE_URL` は Cloud Run の rails-api（末尾 `/v1`）にする。

```sh
cd /home/＜ユーザー＞/react-rails
npm ci
VITE_API_BASE_URL=https://rails-api-885483537018.asia-northeast1.run.app/v1 \
VITE_BASE_URL=/ \
  npm run build
firebase deploy --only hosting --project ishii-portfolio
```

CI（GitHub Actions）からの Hosting デプロイは、ワークフロー差し替え後に `main` への push で行う。Secret `FIREBASE_TOKEN` はリポジトリに置かず GitHub Secrets のみ。

### GitHub Secrets（react-rails リポジトリ）

| Secret | 例 | 用途 |
|--------|-----|------|
| `VITE_API_BASE_URL` | `https://rails-api-885483537018.asia-northeast1.run.app/v1` | ビルド時 API ベース URL（末尾 `/v1`） |
| `VITE_BASE_URL` | `/` | Router basename（任意・未設定時 `/`） |
| `FIREBASE_TOKEN` | `firebase login:ci` の出力 | CI から Hosting へデプロイ（チャットに貼らない） |

`VITE_*` はビルド時に JS へ固定される。API URL を変えたら再デプロイが必要。

### rails-api 側 CORS

[config/initializers/cors.rb](../rails-api/config/initializers/cors.rb) の `origins` に Firebase Hosting の URL を含める。

- `http://localhost:5173`（ローカル Vite）
- `https://ishii-portfolio.web.app`
- `https://ishii-portfolio.firebaseapp.com`

Cloud Run の旧フロント URL は当面残してよい。origin を足したら rails-api を再デプロイする。

### デプロイ後の確認

- `https://ishii-portfolio.web.app` で Home が表示される
- `/about` 等を直接開いても SPA が 404 にならない
- DevTools で API が `VITE_API_BASE_URL` 向けに呼ばれる
- ログイン後 `access-token` / `client` / `uid` が localStorage に入る

## 旧・参考：デプロイ（Cloud Run）

以前は `main` への push で [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) が Cloud Run に出していた。  
Vite でビルドした静的ファイルを nginx が **8080** で配信する。フロントの本番配信は Firebase Hosting へ移行する。Dockerfile / nginx は当面残す。

### 事前準備（GCP）

1. Artifact Registry リポジトリ `frontend` を作成（未作成の場合）

```sh
gcloud artifacts repositories create frontend \
  --repository-format=docker \
  --location=asia-northeast1 \
  --project=YOUR_PROJECT_ID
```

`ishii-portfolio` では現時点で `frontend` リポジトリ未作成のため、初回デプロイ前に上記が必要。

2. CI 用サービスアカウント（`GCP_SA_KEY`）に付与

- `roles/artifactregistry.writer`
- `roles/run.admin`
- `roles/iam.serviceAccountUser`

3. [rails-api](https://github.com/ishii-toshihiko/rails-api) を Cloud Run にデプロイ済みであること

### GitHub Secrets（react-rails リポジトリ）

| Secret | 例 | 用途 |
|--------|-----|------|
| `GCP_PROJECT_ID` | `ishii-portfolio` | gcloud / イメージパス |
| `GCP_SA_KEY` | SA JSON 全体 | GCP 認証 |
| `VITE_API_BASE_URL` | `https://rails-api-885483537018.asia-northeast1.run.app/v1` | ビルド時 API ベース URL（末尾 `/v1`） |
| `VITE_BASE_URL` | `/` | Router basename（任意・未設定時 `/`） |

`VITE_*` はビルド時に JS へ固定される。API URL を変えたら再デプロイが必要。

### rails-api 側 CORS

[config/initializers/cors.rb](../rails-api/config/initializers/cors.rb) の `origins` に react-rails の Cloud Run URL が含まれていることを確認する。URL が変わった場合は rails-api を再デプロイする。

### デプロイ後の確認

```sh
gcloud run services describe react-rails \
  --region=asia-northeast1 \
  --project=YOUR_PROJECT_ID \
  --format='value(status.url)'
```

- Cloud Run URL で Home が表示される
- `/about` 等を直接開いても SPA が 404 にならない
- DevTools で API が `VITE_API_BASE_URL` 向けに呼ばれる
- ログイン後 `access-token` / `client` / `uid` が localStorage に入る