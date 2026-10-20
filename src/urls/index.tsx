import axios from 'axios'

// interceptor 設定
axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')

  if (accessToken && client && uid) {
    config.headers['access-token'] = accessToken
    config.headers['client'] = client
    config.headers['uid'] = uid
  }

  return config
})

const DEFAULT_API_LOCALHOST: string = import.meta.env.VITE_API_BASE_URL;
export const loginIndex: string = `${DEFAULT_API_LOCALHOST}/auth/sign_in`;
export const logoutIndex: string = `${DEFAULT_API_LOCALHOST}/auth/sign_out`;
export const pageViewsIndex: string = `${DEFAULT_API_LOCALHOST}/page_views`;