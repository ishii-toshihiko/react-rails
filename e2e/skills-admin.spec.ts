import { expect, test, type Page, type Route } from '@playwright/test'

type SkillRecord = {
  id: number
  category: string
  item: string
  term: number
}

const seedDrafts: SkillRecord[] = [
  { id: 1, category: 'soft', item: 'Ruby', term: 5 },
  { id: 2, category: 'heard', item: 'FPGA設計', term: 3 },
]

const json = (data: unknown, status = 200) => ({
  status,
  contentType: 'application/json',
  body: JSON.stringify(data),
})

const stubSkillDraftsApi = async (page: Page, canPublish: boolean) => {
  let drafts = structuredClone(seedDrafts)
  let nextId = 3

  // Vite のソースは除外し、API ホストの skill_drafts だけスタブする
  await page.route(
    (url) => url.port === '3000' && /\/skill_drafts(?:\/|$)/.test(url.pathname),
    async (route: Route) => {
      const request = route.request()
      const method = request.method()
      const url = new URL(request.url())
      const idMatch = url.pathname.match(/\/skill_drafts\/(\d+)/)
      const id = idMatch ? Number(idMatch[1]) : null
      const isPublish = url.pathname.endsWith('/skill_drafts/publish')
      const isReset = url.pathname.endsWith('/skill_drafts/reset')

      if (method === 'GET' && id === null && !isPublish && !isReset) {
        await route.fulfill(json({ drafts, can_publish: canPublish }))
        return
      }

      if (method === 'POST' && isReset) {
        drafts = structuredClone(seedDrafts)
        await route.fulfill(json({ drafts, can_publish: canPublish }))
        return
      }

      if (method === 'POST' && isPublish) {
        if (!canPublish) {
          await route.fulfill(json({ error: 'Forbidden' }, 403))
          return
        }
        await route.fulfill(json({ ok: true, skills: drafts }))
        return
      }

      if (method === 'POST' && id === null) {
        const body = request.postDataJSON() as {
          category: string
          item: string
          term: number
        }
        const created = { id: nextId++, ...body }
        drafts = [...drafts, created]
        await route.fulfill(json(created, 201))
        return
      }

      if (method === 'PATCH' && id !== null) {
        const body = request.postDataJSON() as {
          category: string
          item: string
          term: number
        }
        drafts = drafts.map((draft) =>
          draft.id === id ? { ...draft, ...body } : draft
        )
        const updated = drafts.find((draft) => draft.id === id)
        await route.fulfill(json(updated ?? {}))
        return
      }

      if (method === 'DELETE' && id !== null) {
        drafts = drafts.filter((draft) => draft.id !== id)
        await route.fulfill({ status: 204, body: '' })
        return
      }

      await route.fulfill(json({ error: 'not found' }, 404))
    }
  )
}

test('未ログインではスキル管理画面に入れない', async ({ page }) => {
  await page.goto('/admin/skills')
  await expect(page).toHaveURL(/\/v1\/auth$/)
  await expect(page.getByText('ログインページ', { exact: true })).toBeVisible()
})

test('ログイン後は下書きの表示と編集ができる', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('access-token', 'admin-token')
    localStorage.setItem('client', 'admin-client')
    localStorage.setItem('uid', 'guest@example.com')
  })
  await stubSkillDraftsApi(page, false)

  await page.goto('/admin/skills')
  await expect(page.getByRole('heading', { name: 'スキル管理' })).toBeVisible()
  await expect(page.getByText('公開権限がありません')).toBeVisible()
  await expect(page.getByRole('button', { name: '下書きを公開する' })).toHaveCount(0)
  await expect(page.getByRole('cell', { name: 'Ruby' })).toBeVisible()

  await page.getByRole('row', { name: /Ruby/ }).getByRole('button', { name: '編集' }).click()
  await expect(page.getByRole('heading', { name: /編集中/ })).toBeVisible()
  await page.getByLabel('経験年数').fill('8')
  await page.getByRole('button', { name: '更新する' }).click()

  await expect(page.getByRole('row', { name: /Ruby/ })).toContainText('8')
  await expect(page.getByRole('heading', { name: '新規追加（下書き）' })).toBeVisible()
  await expect(page.getByText('公開ページにはまだ反映されていません')).toBeVisible()
})

test('オーナーは公開ボタンを使える', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('access-token', 'owner-token')
    localStorage.setItem('client', 'owner-client')
    localStorage.setItem('uid', 'owner@example.com')
  })
  await stubSkillDraftsApi(page, true)

  await page.goto('/admin/skills')
  await expect(page.getByRole('button', { name: '下書きを公開する' })).toBeVisible()
  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: '下書きを公開する' }).click()
  await expect(page.getByText('公開スキルへ反映しました')).toBeVisible()
})
