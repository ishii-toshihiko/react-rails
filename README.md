# Works IT Portfolio（react-rails）

個人ポートフォリオの **フロントエンド** です。作品・スキル・お問合せなどを表示し、API（rails-api）と連携します。

**案件向けの読み物:** [CASE_STUDY.md](./CASE_STUDY.md)  
**運用メモ:** [docs/運用メモ.md](./docs/運用メモ.md)

| 項目 | 内容 |
|------|------|
| デモ | [https://ishii-portfolio-front.web.app](https://ishii-portfolio-front.web.app) |
| API | [rails-api](https://github.com/ishii-toshihiko/rails-api)（Cloud Run） |
| 配信 | Firebase Hosting（SPA） |
| 担当範囲 | UI・画面遷移・認証トークン保持・API 呼び出し・Hosting デプロイ |
| 想定規模 | 小〜中規模の Rails API + React（認証・フォーム・メール・簡単な計測を含む Web） |
| お問合せ | デモの [Contact](https://ishii-portfolio-front.web.app/contact) から（実メールは非公開） |

## 技術スタック

- React 19 + TypeScript + Vite
- MUI
- React Router
- Axios + Devise Token Auth ヘッダ
- Firebase Hosting + GitHub Actions
- Playwright（スモーク e2e）

## 主な画面・機能

| 画面 | 内容 |
|------|------|
| Home | トップ、アクセスカウンタ、ログイン導線 |
| About | プロフィール、できること／案件の向き不向き、連絡導線 |
| Skills | 経験年数バー（ソフト／ハード） |
| Works | 職務年表＋担当・技術の概要 |
| Contact | お問合せ（案件相談歓迎）。API 経由でメール送信 |
| ログイン | トークンを localStorage に保持（プレビュー等） |

- お問合せフォーム → `POST /v1/contacts`（成功・失敗・レート制限を画面表示）
- ログイン時のみ、送信前にメール内容プレビューを表示

## 構成（概要）

```text
Firebase Hosting (このリポジトリの dist)
  → Cloud Run rails-api (/v1/...)
      → Neon / Resend
```

## 品質ゲート（CI）

`main` への push で **deploy 前**に次を実行します（壊れたまま Hosting に載せないため）。

- ESLint / knip
- **Playwright**（`npm run test:e2e` ← `e2e/smoke.spec.ts` ＋ `e2e/skills-admin.spec.ts`）
  - 公開ページ表示
  - お問合せフォーム表示
  - ログイン状態でのメニュー遷移
  - スキル管理の未ログイン拒否・下書き編集

詳細な切り分け手順は [docs/運用メモ.md](./docs/運用メモ.md)、案件向けの運用要約は [CASE_STUDY.md の運用節](./CASE_STUDY.md#8-運用) を参照。

## 担当・ポイント

- 静的フロントと API を分離し、Hosting + Cloud Run で運用
- お問合せはフロントから直接 Resend を叩かず、API 経由（キーを埋め込まない）
- SPA の直リンク（`/about` 等）を Hosting rewrite で対応
