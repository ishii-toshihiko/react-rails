import axios from 'axios'
import { pageViewsIndex } from '../urls'

type PageViewResponse = {
  path: string
  count: number
}

const SESSION_KEY_PREFIX = 'page_view_recorded:'

export const recordPageView = async (path: string): Promise<number | null> => {
  const sessionKey = `${SESSION_KEY_PREFIX}${path}`
  try {
    if (sessionStorage.getItem(sessionKey)) {
      const cached = sessionStorage.getItem(`${sessionKey}:count`)
      return cached ? Number(cached) : null
    }

    const response = await axios.post<PageViewResponse>(
      pageViewsIndex,
      { path },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )

    const count = response.data.count
    sessionStorage.setItem(sessionKey, '1')
    sessionStorage.setItem(`${sessionKey}:count`, String(count))
    return count
  } catch (error) {
    console.error(error)
    return null
  }
}
