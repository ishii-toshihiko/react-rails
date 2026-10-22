export const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  return Boolean(accessToken && client && uid)
}
