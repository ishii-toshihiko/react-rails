# 案件向け概要（Works IT Portfolio）

個人ポートフォリオサイトを、フロント／API 分離の本番構成で公開した事例です。  
フリーランスとして小〜中規模の Web（Rails API + React）を任せる際の技術サンプルとしてご覧ください。

| 項目 | 内容 |
|------|------|
| デモ | [https://ishii-portfolio-front.web.app](https://ishii-portfolio-front.web.app) |
| フロント | [react-rails](https://github.com/ishii-toshihiko/react-rails) |
| API | [rails-api](https://github.com/ishii-toshihiko/rails-api) |
| お問合せ | デモサイトの Contact フォームからご連絡ください |

## 1. 課題

自身のスキル・経歴を見せるサイトが必要だった。静的ページだけでなく、認証・API・メール送信・本番デプロイまで一貫して示したい。

## 2. 解決

- フロント: React（Vite）を Firebase Hosting で配信（SPA）
- API: Rails API モードを Cloud Run で公開
- DB: Neon（PostgreSQL）。案件によっては Cloud SQL も選択可（後述）
- お問合せ: Resend HTTP API（サーバー側のみキーを保持）

```text
Browser (Firebase Hosting)
  → Cloud Run (rails-api)
      → Neon (Postgres)  ※本デモ
      → Resend (contact email)
```

## 3. 担当

設計〜実装〜 GitHub Actions による CI/CD（lint / テスト / デプロイ）まで一通り。

## 4. 技術選定の理由（要約）

| 技術 | 理由 |
|------|------|
| Rails API | 認証・JSON API・Service 分離がしやすい |
| React + Vite | SPA として画面を分けつつビルドが軽い |
| Firebase Hosting | 静的配信と SPA rewrite が手軽 |
| Cloud Run | コンテナ単位で API を運用できる |
| PostgreSQL（Cloud SQL / Neon） | 用途に応じて使い分け（下記） |
| Resend | SMTP 不要で Cloud Run 向きのメール送信 |
| Secret Manager | API キー等をリポジトリに置かない |

### DB の使い分け

本格的な GCP 連携や VPC 要件がある案件では **Cloud SQL** を選択します。  
本ポートフォリオでは、デモ運用の保守・コストを抑えるため **Neon**（マネージド Postgres）を採用し、API は Cloud Run から SSL 接続しています。

## 5. デモ・リポジトリ

- デモ: [ishii-portfolio-front.web.app](https://ishii-portfolio-front.web.app)
- フロント: [github.com/ishii-toshihiko/react-rails](https://github.com/ishii-toshihiko/react-rails)
- API: [github.com/ishii-toshihiko/rails-api](https://github.com/ishii-toshihiko/rails-api)

### 主要画面（デモでの見方）

| 画面 | 内容 |
|------|------|
| Home (`/`) | トップ。アクセス数表示・ログイン導線 |
| About (`/about`) | プロフィール、できること／案件の向き不向き、経歴・資格 |
| Skills (`/skills`) | ソフト／ハードの経験年数（バー表示・公開 GET） |
| スキル管理 (`/admin/skills`) | ログイン後のみ。ユーザー別の下書き CRUD。公開反映はオーナーのみ |
| Works (`/works`) | 職務年表＋各行の担当・技術概要 |
| Contact (`/contact`) | お問合せ（API 経由でメール送信） |
| ログイン (`/v1/auth`) | トークン認証（管理画面の入口） |

## 6. 追加した業務機能（スキル下書き / オーナー公開）

公開サイトのスキル一覧は誰でも読めます。ログインユーザーは**自分専用の下書き**を編集でき、**公開への反映はオーナーのみ**です。

| 層 | 内容 |
|----|------|
| 公開 API | `GET /v1/skills`（確定データ。閲覧者向け） |
| 下書き API | `/v1/skill_drafts` の CRUD はログイン必須・ユーザー分離。`POST .../reset` で公開内容を再読込 |
| 公開反映 | `POST /v1/skill_drafts/publish` は `SKILLS_OWNER_EMAIL` と一致するアカウントのみ |
| フロント | `/admin/skills` を `RequireAuth` で保護。非オーナーには公開ボタンを出さない |
| テスト | rails-api request spec（ユーザー分離・公開 403）。Playwright で未ログイン拒否・下書き編集・オーナー公開 |

デモでの見方: ログイン →「スキル管理」→ 下書きを編集。閲覧者の `/skills` はオーナーが「下書きを公開する」まで変わりません。

## 7. 工夫

- お問合せはフロントから Resend を直接叩かず、API 経由（キー非公開）
- バリデーション・honeypot・簡易レート制限
- 秘密情報は GitHub Secrets → Secret Manager → Cloud Run のみ
- DB は案件要件に応じて Cloud SQL / Neon を使い分け（デモは Neon で低運用）
- 公開読み取りと管理書き込みの権限境界を API／画面の両方で明示
- **Playwright**（`e2e/smoke.spec.ts`＋`e2e/skills-admin.spec.ts`）を CI の deploy 前に実行  
  （公開ページ・お問合せフォーム・メニュー遷移・スキル管理の権限境界）

## 8. 運用

発注者が気にする「連絡・障害・品質ゲート」を、本デモでの運用実態としてまとめます。  
手順の詳細は [docs/運用メモ.md](./docs/運用メモ.md) を参照してください。

### デプロイ

| 対象 | 手段 |
|------|------|
| フロント | `main` push → GitHub Actions → lint / knip / Playwright → Firebase Hosting |
| API | `main` push → GitHub Actions → RuboCop / RSpec → イメージ push → Cloud Run → `db:prepare` Job |

### ログ・監視

- API（Cloud Run）: **Cloud Logging** でリクエスト／アプリログを確認
- フロント（Firebase Hosting）: Hosting の配信状況・デプロイ履歴を Console で確認
- お問合せ失敗時: API ログと Resend 側の配信状況を突き合わせ（本文全文はログに出さない）

外部の有料監視 SaaS は未導入です。小〜中規模デモでは上記で十分な切り分けができます。

### 品質ゲート（CI）

デプロイ前に自動実行しています。

- **フロント:** ESLint → knip → Playwright（スモーク＋スキル管理の権限境界）→ ビルド／Hosting デプロイ
- **API:** RuboCop → RSpec → イメージビルド／Cloud Run デプロイ

「壊れたまま本番に載らない」ことを、営業・技術の両面で示すための仕組みです。

### 障害時の切り分け（要約）

1. デモ画面が出るか（Hosting / DNS）
2. API の health（Cloud Run のリビジョン・ログ）
3. お問合せだけ失敗するか（Resend・Secret・レート制限）
4. スキル表示だけおかしいか（公開 `GET /v1/skills` と下書きの取り違え）

詳細手順は運用メモに記載しています。

### 連絡手段

案件のご相談は、デモの **[Contact フォーム](https://ishii-portfolio-front.web.app/contact)** からお願いします（実メールアドレスはサイトに公開していません）。

## 向いている案件（目安）

- Rails API + React の小〜中規模 Web
- 認証・フォーム・メール・簡単な計測を含むサイト
- コンテナ／Hosting でのデプロイ込み

## 向いていない案件（目安）

- 大規模チーム前提の超大規模基幹
- ネイティブアプリ中心
- ドメイン知識が主体で実装がごく薄い案件のみ、など
