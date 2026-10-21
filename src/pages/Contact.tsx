import { Divider } from '@mui/material'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { TextField, Button, Box, Typography, Chip } from '@mui/material'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
import { sendContact } from '../apis/sendContact'
import { contactAccent } from '../data/navItems'

const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  return Boolean(accessToken && client && uid)
}

const previewValue = (value: string): string => {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : '（未入力）'
}

type FormStatus = 'idle' | 'success' | 'validation' | 'rate_limit' | 'failed'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(isAuthenticated())
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus('idle')

    const result = await sendContact({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      website: formData.website,
    })

    setSubmitting(false)

    if (result.ok) {
      setStatus('success')
      setFormData({ name: '', email: '', message: '', website: '' })
      return
    }

    setStatus(result.reason)
  }

  const statusMessage = (() => {
    switch (status) {
      case 'success':
        return '送信しました。案件のご相談も歓迎です。内容を確認のうえ、ご連絡いたします。'
      case 'validation':
        return '入力内容を確認してください。'
      case 'rate_limit':
        return '送信回数が上限に達しました。しばらくしてから再度お試しください。'
      case 'failed':
        return '送信に失敗しました。しばらくしてから再度お試しください。'
      default:
        return null
    }
  })()

  return (
    <>
      <Divider />
      <Box
        className="table-container-size contact-theme"
        component="form"
        onSubmit={handleSubmit}
      >
        <Button
          className="contact-button"
          size="small"
          disableElevation
          sx={{ bgcolor: contactAccent, '&:hover': { bgcolor: '#37474f' } }}
        >
          お問い合わせ
        </Button>
        <br />

        <div className="contact-field">
          <TextField
            className="contact-name"
            label="お名前"
            name="name"
            variant="outlined"
            required
            inputProps={{ maxLength: 100 }}
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            className="contact-email"
            label="メールアドレス"
            name="email"
            type="email"
            variant="outlined"
            required
            inputProps={{ maxLength: 255 }}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="contact-field">
          <TextField
            className="contact-message"
            label="お問い合わせ内容"
            name="message"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
            required
            inputProps={{ maxLength: 2000 }}
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        {/* honeypot: 人間には見せない */}
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        {loggedIn && (
          <Box className="contact-preview" aria-live="polite">
            <Box className="contact-preview-heading">
              <Chip
                size="small"
                variant="outlined"
                icon={<MarkEmailReadOutlinedIcon />}
                label="プレビュー"
                sx={{
                  color: contactAccent,
                  borderColor: contactAccent,
                  '& .MuiChip-icon': { color: contactAccent },
                }}
              />
              <Typography className="contact-preview-title" component="h2">
                送信内容のプレビュー
              </Typography>
            </Box>
            <Typography className="contact-preview-note">
              下の内容が、そのまま担当者宛メールになります（まだ送信されていません）。
            </Typography>

            <Box className="contact-preview-mail" role="region" aria-label="メールプレビュー">
              <Box className="contact-preview-headers">
                <Typography className="contact-preview-header-row" component="div">
                  <span className="contact-preview-label">件名</span>
                  <span className="contact-preview-value">
                    Portfolio contact from {previewValue(formData.name)}
                  </span>
                </Typography>
                <Typography className="contact-preview-header-row" component="div">
                  <span className="contact-preview-label">From</span>
                  <span className="contact-preview-value">サイト通知用アドレス</span>
                </Typography>
                <Typography className="contact-preview-header-row" component="div">
                  <span className="contact-preview-label">To</span>
                  <span className="contact-preview-value">担当者宛（設定アドレス）</span>
                </Typography>
                <Typography className="contact-preview-header-row" component="div">
                  <span className="contact-preview-label">Reply-To</span>
                  <span className="contact-preview-value">{previewValue(formData.email)}</span>
                </Typography>
              </Box>
              <Typography className="contact-preview-message" component="pre">
                {`Name: ${previewValue(formData.name)}
Email: ${previewValue(formData.email)}

Message:
${previewValue(formData.message)}`}
              </Typography>
            </Box>
            <Typography className="contact-preview-footer">
              ↑ この内容で送信されます
            </Typography>
          </Box>
        )}

        <div className="contact-field">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
            sx={{
              margin: 2,
            }}
          >
            {submitting ? '送信中…' : '送信する'}
          </Button>
        </div>

        {statusMessage && (
          <Typography
            className="contact-status"
            role="status"
            sx={{ mx: 2, mb: 2 }}
            color={status === 'success' ? 'success.main' : 'error.main'}
          >
            {statusMessage}
          </Typography>
        )}
      </Box>

      <Divider />
      <Box className="table-container-size contact-company">
        <Box className="contact-company-heading">
          <Typography className="contact-logo" component="div">
            Works I.T
          </Typography>
          <Chip size="small" label="架空情報" variant="outlined" />
        </Box>
        <Typography className="contact-company-line">
          〒000-0000 架空県架空市架空町00-0-800
        </Typography>
        <Typography className="contact-company-line">
          Tel 090-0000-0000
          <span className="contact-company-sep"> / </span>
          dummy@example.com
        </Typography>
      </Box>
      <Divider />
    </>
  )
}

export default Contact
