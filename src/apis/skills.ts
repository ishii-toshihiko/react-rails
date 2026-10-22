import axios from 'axios'
import { skillDraftsIndex, skillsIndex } from '../urls'
import type { Skill, SkillInput } from '../types/Skill'

export type SkillDraftsResponse = {
  drafts: Skill[]
  can_publish: boolean
}

/** 公開スキル（閲覧者向け） */
export const fetchSkills = async (): Promise<Skill[]> => {
  const response = await axios.get<Skill[]>(skillsIndex, {
    headers: { Accept: 'application/json' },
  })
  return response.data
}

/** 自分の下書き一覧（未作成なら公開内容から初期化される） */
export const fetchSkillDrafts = async (): Promise<SkillDraftsResponse> => {
  const response = await axios.get<SkillDraftsResponse>(skillDraftsIndex, {
    headers: { Accept: 'application/json' },
  })
  return response.data
}

export const createSkillDraft = async (input: SkillInput): Promise<Skill> => {
  const response = await axios.post<Skill>(skillDraftsIndex, input, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  return response.data
}

export const updateSkillDraft = async (
  id: number,
  input: SkillInput
): Promise<Skill> => {
  const response = await axios.patch<Skill>(`${skillDraftsIndex}/${id}`, input, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  return response.data
}

export const deleteSkillDraft = async (id: number): Promise<void> => {
  await axios.delete(`${skillDraftsIndex}/${id}`, {
    headers: { Accept: 'application/json' },
  })
}

/** 公開内容を自分の下書きへ再同期 */
export const resetSkillDrafts = async (): Promise<SkillDraftsResponse> => {
  const response = await axios.post<SkillDraftsResponse>(
    `${skillDraftsIndex}/reset`,
    {},
    { headers: { Accept: 'application/json' } }
  )
  return response.data
}

/** オーナーのみ: 下書きを公開スキルへ反映 */
export const publishSkillDrafts = async (): Promise<void> => {
  await axios.post(
    `${skillDraftsIndex}/publish`,
    {},
    { headers: { Accept: 'application/json' } }
  )
}
