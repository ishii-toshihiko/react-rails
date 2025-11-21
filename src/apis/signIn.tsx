import axios from 'axios'
import { loginIndex } from '../urls'

interface LoginParams {
  email: string
  password: string
}

export const verifyUserData = async (
  params: LoginParams
): Promise<boolean> => {
  try {
    const response = await axios.post(
        loginIndex, {
            email: params.email,
            password: params.password
        },
        {
            headers: {              /* JSON を明示する */
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )

    const client = response.data.data.client    // responseの構造がdata.dataになっている
    const uid = response.data.data.uid
    const accessToken = response.data.data.access_token

    if (accessToken && client && uid) {
      localStorage.setItem('access-token', accessToken)
      localStorage.setItem('client', client)
      localStorage.setItem('uid', uid)
    }

    //alert('ログイン成功しました。')
    return true
  } catch (error) {
    console.error(error)
    alert('ログイン失敗しました。')
    return false
  }
}