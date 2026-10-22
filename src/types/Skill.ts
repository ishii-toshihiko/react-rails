export type SkillCategory = 'soft' | 'heard'

export type Skill = {
  id: number
  category: string
  item: string
  term: number
}

export type SkillInput = {
  category: SkillCategory
  item: string
  term: number
}
