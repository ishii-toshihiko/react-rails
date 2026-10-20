import axios from 'axios'
import { contactsIndex } from '../urls'

export type ContactPayload = {
  name: string
  email: string
  message: string
  website: string
}

export type SendContactResult =
  | { ok: true }
  | { ok: false; reason: 'validation' | 'rate_limit' | 'failed' }

export const sendContact = async (
  payload: ContactPayload
): Promise<SendContactResult> => {
  try {
    await axios.post(
      contactsIndex,
      {
        name: payload.name,
        email: payload.email,
        message: payload.message,
        website: payload.website,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    return { ok: true }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      if (status === 422) return { ok: false, reason: 'validation' }
      if (status === 429) return { ok: false, reason: 'rate_limit' }
    }
    return { ok: false, reason: 'failed' }
  }
}
