import { ListItem, ListItemText, Divider,ListItemIcon } from "@mui/material"
import CallIcon from '@mui/icons-material/Call'
import BusinessIcon from '@mui/icons-material/Business'
import EmailIcon from '@mui/icons-material/Email'
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material'


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

const Contact=()=>{
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('送信内容:', formData);
    // ここでメール送信処理を追加（例：EmailJS、Formspree、Rails APIなど）
  }

  return(
    <>
      <Divider/>
      <Box className="table-container-size contact-theme"
        component="form"
        onSubmit={handleSubmit}
      >
        <Button className="works-button contact-button">
          お問い合わせ
        </Button>
        <br />

        <div className="contact-field">
          <TextField className="contact-name"
            label="お名前"
            name="name"
            variant="outlined"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField className="contact-email"
            label="メールアドレス"
            name="email"
            type="email"
            variant="outlined"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="contact-field">
          <TextField className="contact-message"
            label="お問い合わせ内容"
            name="message"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="contact-field">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              margin: 2,
            }}
          >
            送信する
          </Button>
        </div>
      </Box>

      <Divider/>
      <Box className='table-container-size'>
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
      <Divider/>
    </>
  )
}
export default Contact