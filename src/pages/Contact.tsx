import { ListItem, ListItemText, Divider, ListItemIcon } from "@mui/material"
import CallIcon from '@mui/icons-material/Call'
import BusinessIcon from '@mui/icons-material/Business'
import EmailIcon from '@mui/icons-material/Email'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { sendContact } from '../apis/sendContact'

const contactDetails = [
  {
    icon: <BusinessIcon style={{ color: 'green' }} />,
    text: '住所： 〒000-0000 架空県架空市架空町00-0-800',
  },
  {
    icon: <CallIcon style={{ color: 'orange' }} />,
    text: '電話番号： 090-0000-0000',
  },
  {
    icon: <EmailIcon style={{ color: 'blue' }} />,
    text: 'Eメール： dummy@example.com',
  },
]

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
        return '送信しました。ご連絡ありがとうございます。'
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
        <Button className="works-button contact-button">
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
      <Box className="table-container-size">
        <div className="contact-logo">
          Works I.T
        </div>
        <span className="table-cell-std contact-address">
          （※ 以下はセキュリティ保護のため架空情報です）
        </span>

        {contactDetails.map((detail, index) => (
          <ListItem key={index}>
            <ListItemIcon>{detail.icon}</ListItemIcon>
            <ListItemText>
              <span className="table-cell-std contact-address">
                {detail.text}
              </span>
            </ListItemText>
          </ListItem>
        ))}
      </Box>
      <Divider />
    </>
  )
}

export default Contact
