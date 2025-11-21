import axios from 'axios'
import { logoutIndex } from '../urls/index'

/* ログアウト処理のエントリーポイント */
export const signOutUser = async (): Promise<void> => {
    try {
        const headers = getAuthHeaders()
        await requestSignOut(headers)
        clearAuthHeaders()
        //notifyLogoutSuccess()
        reloadPage()
    } catch (error) {
        handleLogoutError(error)
    }
}

const clearAuthHeaders = () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('client')
    localStorage.removeItem('uid')
}

/* 認証ヘッダーをCookieから取得 */
const getAuthHeaders = ():Record<string,string> =>{
    const accessToken = localStorage.getItem('access-token')??''
    const client = localStorage.getItem('client')??''
    const uid = localStorage.getItem('uid')??''
    const headers = {
        'access-token': accessToken,
        'client': client,
        'uid': uid,
      }
    return headers
}

/* サーバーにログアウトリクエストを送信 */
const requestSignOut = async (headers: Record<string, string>): Promise<void> => {
    await axios.delete(logoutIndex, { headers })
}

/* ログアウト成功通知 */
// const notifyLogoutSuccess = (): void => {
//     alert('ログアウト成功しました。')
// }

/* ページをリロード */
const reloadPage = (): void => {
    window.location.reload()
}

/* エラーハンドリング */
const handleLogoutError = (error: unknown): void => {
    console.error('ログアウト失敗:', error)
}