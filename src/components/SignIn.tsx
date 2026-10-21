import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { verifyUserData } from '../apis/signIn'

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()      // 👈これでReact 側でフォーム送信を完全に止める
        const params = { email, password }
        const success = await verifyUserData(params)
        if (success) {
            navigate('/')
        }
        window.location.reload()       // Headerを再読み込みさせるためリロード
    }
    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',backgroundColor:'lightBlue' }}>
        <div style={{ margin: '50px',fontWeight: 'bold',fontSize: 20 }}>ログインページ</div>
            <TextField
                label="メールアドレス"
                placeholder="メールアドレスを入力してください。"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: 280 }}
            />
            <br /><br />
            <TextField
                label="パスワード"
                placeholder="パスワードを入力してください。"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: 280 }}
            />
            <br /><br />
            <Button variant="outlined" onClick={handleLogin}>
                ログイン
            </Button>
        <br /><br /><br />
        </div>
        </>
    )
}
export default SignIn