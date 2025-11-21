import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { Drawer, IconButton, List, ListItem, ListItemText, Box } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import { Link } from "react-router-dom"
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Psychology as PsychologyIcon,
  Business as BusinessIcon,
  Mail as MailIcon,
} from '@mui/icons-material'


const MobileMenu = ()=>{
  const [open, setOpen] = useState(false)

  const menuItems = [
    { icon:<HomeIcon/>,label: 'トップ', path: '/', color: 'orange', hoverColor: '#cc6600' },
    { icon:<PersonIcon/>,label: 'プロフィール', path: '/about', color: 'purple', hoverColor: '#4b0082' },
    { icon:<PsychologyIcon/>,label: 'スキル', path: '/skills', color: 'green', hoverColor: '#006400' },
    { icon:<BusinessIcon/>,label: '業務職歴', path: '/works', color: 'blue', hoverColor: '#00008b' },
    { icon:<MailIcon/>,label: 'お問い合せ', path: '/contact', color: 'gray', hoverColor: '#444' },
  ]

  return(
    <>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,                           // アイコンと文字の間隔
          fontSize: 15,
          color: 'white',
          backgroundColor:'lightblue',
          borderRadius: 0,
          '&:hover': {
            backgroundColor: 'primary.dark', // ホバー時の色
          },
        }}
      >
        <MenuIcon />
        <Typography>
          menu
        </Typography>
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <p
          style={{
            position: 'relative',
            borderBottom: '1px solid #ccc',
            paddingBottom: 15,
            marginBottom: 1,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              position: 'relative',
              left: '10px',
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: '1.3rem'
            }}
          >
            Works I.T
          </span>
        </p>
        <Box>
          <List>
            {menuItems.map(({ icon, label, path, color, hoverColor }) => (
                <ListItem
                sx={{
                  borderBottom: '1px solid #ccc',
                  paddingBottom: 1,
                  marginBottom: 1,
                }}
                >
                  <Box sx={{ marginRight:0.5 ,color:color, position:'relative',top:5}}>
                    {icon}
                  </Box>
                  <Link
                    to={path}
                    key={path}
                    style={{
                      textDecoration: 'none',
                      width: '100%',
                    }}
                  >
                    <ListItemButton sx={{
                      width: 80,
                      backgroundColor: color,
                      textAlign: 'center',
                      borderRadius: 1,
                      color:'White',
                      '&:hover': {
                        backgroundColor: hoverColor,
                      },
                      padding: 0.5,
                    }}>
                      <ListItemText
                      disableTypography
                      primary={
                        <Typography sx={{ fontSize: '0.7rem', color: 'white' }}>
                          {label}
                        </Typography>
                      }
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            width: 160,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'grey.200',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'grey.300',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Drawer>
    </>
  )
}
export default MobileMenu