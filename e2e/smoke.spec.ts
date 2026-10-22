import { expect, test, type Page } from '@playwright/test'

const pages = [
  { path: '/', text: "Ishii Toshihiko's Portfolio" },
  { path: '/about', text: 'できること・案件の向き不向き' },
  { path: '/skills', text: 'Web がメイン、回路・FPGA も対応' },
  { path: '/works', text: '職務経歴' },
  { path: '/contact', text: 'お問い合わせ' },
  { path: '/v1/auth', text: 'ログインページ' },
] as const

const menuItems = [
  { label: 'トップ', path: '/' },
  { label: 'プロフィール', path: '/about' },
  { label: 'スキル', path: '/skills' },
  { label: '業務職歴', path: '/works' },
  { label: 'お問い合せ', path: '/contact' },
] as const

const stubApi = async (page: Page) => {
  await page.route('**/page_views', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ path: '/', count: 1 }),
    })
  })

  await page.route('**/contacts', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    })
  })

  await page.route('**/auth/**', async (route) => {
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({}),
    })
  })
}

test.beforeEach(async ({ page }) => {
  await stubApi(page)
})

test('公開ページが表示される', async ({ page }) => {
  for (const entry of pages) {
    await page.goto(entry.path)
    await expect(page.getByText("Ishii Toshihiko's Portfolio")).toBeVisible()
    await expect(page.getByText(entry.text).first()).toBeVisible()
  }

  await page.goto('/')
  await expect(page.getByRole('button', { name: 'ログインページへ' })).toBeVisible()
  await expect(page.getByText('1 views')).toBeVisible()
})

test('お問い合わせフォームが表示される', async ({ page }) => {
  await page.goto('/contact')
  await expect(page.getByRole('textbox', { name: 'お名前' })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'メールアドレス' })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'お問い合わせ内容' })).toBeVisible()
  await expect(page.getByRole('button', { name: '送信する' })).toBeVisible()
})

test('ログイン状態ではメニューから各画面へ遷移できる', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('access-token', 'smoke-token')
    localStorage.setItem('client', 'smoke-client')
    localStorage.setItem('uid', 'smoke@example.com')
  })

  await page.goto('/')

  for (const item of menuItems) {
    await page.getByRole('link', { name: item.label, exact: true }).click()
    await expect(page).toHaveURL(new RegExp(`${item.path}$`))
  }
})
