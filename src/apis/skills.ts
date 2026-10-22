import axios from 'axios'
import { skillsIndex } from '../urls'
import type { Skill, SkillInput } from '../types/Skill'

export const fetchSkills = async (): Promise<Skill[]> => {
  const response = await axios.get<Skill[]>(skillsIndex, {
    headers: { Accept: 'application/json' },
  })
  return response.data
}

export const createSkill = async (input: SkillInput): Promise<Skill> => {
  const response = await axios.post<Skill>(skillsIndex, input, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  return response.data
}

export const updateSkill = async (
  id: number,
  input: SkillInput
): Promise<Skill> => {
  const response = await axios.patch<Skill>(`${skillsIndex}/${id}`, input, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  return response.data
}

export const deleteSkill = async (id: number): Promise<void> => {
  await axios.delete(`${skillsIndex}/${id}`, {
    headers: { Accept: 'application/json' },
  })
}
