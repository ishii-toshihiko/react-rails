import { expect, test, type Page, type Route } from '@playwright/test'

type SkillRecord = {
  id: number
  category: string
  item: string
  term: number
}

const seedSkills: SkillRecord[] = [
  { id: 1, category: 'soft', item: 'Ruby', term: 5 },
  { id: 2, category: 'heard', item: 'FPGA設計', term: 3 },
]

const json = (data: unknown, status = 200) => ({
  status,
  contentType: 'application/json',
  body: JSON.stringify(data),
})

const stubSkillsApi = async (page: Page) => {
  let skills = structuredClone(seedSkills)
  let nextId = 3

  // Vite の /src/apis/skills.ts 等は除外し、API ホストの skills だけスタブする
  await page.route(
    (url) => url.port === '3000' && /\/skills(?:\/|$)/.test(url.pathname),
    async (route: Route) => {
      const request = route.request()
      const method = request.method()
      const url = new URL(request.url())
      const idMatch = url.pathname.match(/\/skills\/(\d+)/)
      const id = idMatch ? Number(idMatch[1]) : null

      if (method === 'GET' && id === null) {
        await route.fulfill(json(skills))
        return
      }

      if (method === 'POST') {
        const body = request.postDataJSON() as {
          category: string
          item: string
          term: number
        }
        const created = { id: nextId++, ...body }
        skills = [...skills, created]
        await route.fulfill(json(created, 201))
        return
      }

      if (method === 'PATCH' && id !== null) {
        const body = request.postDataJSON() as {
          category: string
          item: string
          term: number
        }
        skills = skills.map((skill) =>
          skill.id === id ? { ...skill, ...body } : skill
        )
        const updated = skills.find((skill) => skill.id === id)
        await route.fulfill(json(updated ?? {}))
        return
      }

      if (method === 'DELETE' && id !== null) {
        skills = skills.filter((skill) => skill.id !== id)
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

test('ログイン後はスキル一覧の表示と編集ができる', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('access-token', 'admin-token')
    localStorage.setItem('client', 'admin-client')
    localStorage.setItem('uid', 'admin@example.com')
  })
  await stubSkillsApi(page)

  await page.goto('/admin/skills')
  await expect(page.getByRole('heading', { name: 'スキル管理' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Ruby' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'スキル管理' })).toBeVisible()

  await page.getByRole('row', { name: /Ruby/ }).getByRole('button', { name: '編集' }).click()
  await expect(page.getByRole('heading', { name: /編集中/ })).toBeVisible()
  await page.getByLabel('経験年数').fill('8')
  await page.getByRole('button', { name: '更新する' }).click()

  await expect(page.getByRole('row', { name: /Ruby/ })).toContainText('8')
  await expect(page.getByRole('heading', { name: '新規追加' })).toBeVisible()
})
