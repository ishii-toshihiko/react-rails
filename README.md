# Works IT Portfolio（react-rails）

個人ポートフォリオの **フロントエンド** です。作品・スキル・お問合せなどを表示し、API（rails-api）と連携します。

**案件向けの読み物:** [CASE_STUDY.md](./CASE_STUDY.md)

| 項目 | 内容 |
|------|------|
| デモ | [https://ishii-portfolio-front.web.app](https://ishii-portfolio-front.web.app) |
| API | [rails-api](https://github.com/ishii-toshihiko/rails-api)（Cloud Run） |
| 配信 | Firebase Hosting（SPA） |
| 担当範囲 | UI・画面遷移・認証トークン保持・API 呼び出し・Hosting デプロイ |
| お問合せ | デモの [Contact](https://ishii-portfolio-front.web.app/contact) から |

## 技術スタック

- React 19 + TypeScript + Vite
- MUI
- React Router
- Axios + Devise Token Auth ヘッダ
- Firebase Hosting + GitHub Actions
- Playwright（スモーク e2e）

## 主な画面・機能

- Home / About / Skills / Works / Contact
- ログイン（トークンを localStorage に保持）
- ホームのアクセスカウンタ（API 連携）
- お問合せフォーム → `POST /v1/contacts`（成功・失敗・レート制限を画面表示）
- ログイン時のみ、送信前にメール内容プレビューを表示

## 構成（概要）

```text
Firebase Hosting (このリポジトリの dist)
  → Cloud Run rails-api (/v1/...)
      → Neon / Resend
```

## 品質ゲート（CI）

`main` への push で deploy 前に次を実行します。

- ESLint / knip
- **Playwright スモーク**（`npm run test:e2e` ← `e2e/smoke.spec.ts`）
  - 公開ページ表示
  - お問合せフォーム表示
  - ログイン状態でのメニュー遷移

## 担当・ポイント

- 静的フロントと API を分離し、Hosting + Cloud Run で運用
- お問合せはフロントから直接 Resend を叩かず、API 経由（キーを埋め込まない）
- SPA の直リンク（`/about` 等）を Hosting rewrite で対応
