/** お問い合せメニュー／Contact 本文の共通色 */
export const contactAccent = '#455a64'

/** 業務職歴メニュー／Works 本文の共通色 */
export const worksAccent = '#1565c0'

/** ヘッダーナビ共通（くっきりしたアクセント色） */
export const navItems = [
  { label: 'トップ', path: '/', accent: '#f57c00', icon: 'home' },
  { label: 'プロフィール', path: '/about', accent: '#8e24aa', icon: 'person' },
  { label: 'スキル', path: '/skills', accent: '#2e7d32', icon: 'skills' },
  { label: '業務職歴', path: '/works', accent: worksAccent, icon: 'works' },
  { label: 'お問い合せ', path: '/contact', accent: contactAccent, icon: 'mail' },
] as const

/** ログイン後のみ表示する管理ナビ */
export const adminNavItems = [
  {
    label: 'スキル管理',
    path: '/admin/skills',
    accent: '#00695c',
    icon: 'adminSkills' as const,
  },
] as const

export type NavItem = (typeof navItems)[number]
export type AdminNavItem = (typeof adminNavItems)[number]
