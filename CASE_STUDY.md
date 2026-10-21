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

## 6. 工夫

- お問合せはフロントから Resend を直接叩かず、API 経由（キー非公開）
- バリデーション・honeypot・簡易レート制限
- 秘密情報は GitHub Secrets → Secret Manager → Cloud Run のみ
- DB は案件要件に応じて Cloud SQL / Neon を使い分け（デモは Neon で低運用）
- **Playwright スモーク**（`e2e/smoke.spec.ts`）を CI の deploy 前に実行  
  （公開ページ表示・お問合せフォーム・ログイン時メニュー遷移）

## 向いている案件（目安）

- Rails API + React の小〜中規模 Web
- 認証・フォーム・メール・簡単な計測を含むサイト
- コンテナ／Hosting でのデプロイ込み

## 向いていない案件（目安）

- 大規模チーム前提の超大規模基幹
- ネイティブアプリ中心
- ドメイン知識が主体で実装がごく薄い案件のみ、など
