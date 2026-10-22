import { Drawer, IconButton, List, ListItem, Box, Typography, Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Psychology as PsychologyIcon,
  Business as BusinessIcon,
  Mail as MailIcon,
  Tune as TuneIcon,
} from '@mui/icons-material'
import { adminNavItems, navItems, type AdminNavItem, type NavItem } from '../data/navItems'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  showAdmin?: boolean
}

const iconMap: Record<NavItem['icon'] | AdminNavItem['icon'], typeof HomeIcon> = {
  home: HomeIcon,
  person: PersonIcon,
  skills: PsychologyIcon,
  works: BusinessIcon,
  mail: MailIcon,
  adminSkills: TuneIcon,
}

const MobileMenu = ({ open, onClose, showAdmin = false }: MobileMenuProps) => {
  const location = useLocation()
  const items = showAdmin ? [...navItems, ...adminNavItems] : [...navItems]

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 280 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.75,
            background: 'linear-gradient(135deg, #e1f5fe 0%, #fff9c4 100%)',
            borderBottom: '3px solid #00838f',
          }}
        >
          <Typography
            sx={{
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: '1.55rem',
              letterSpacing: '0.05em',
              color: '#000',
              textShadow: '1px 2px 4px rgba(0, 0, 0, 0.18), 0 1px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            Works I.T
          </Typography>
          <IconButton
            aria-label="メニューを閉じる"
            onClick={onClose}
            size="small"
            sx={{ bgcolor: 'rgba(255,255,255,0.85)' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List disablePadding sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {items.map(({ icon, label, path, accent }) => {
            const active = location.pathname === path
            const ItemIcon = iconMap[icon]
            return (
              <ListItem key={path} disablePadding>
                <Button
                  component={Link}
                  to={path}
                  onClick={onClose}
                  variant="contained"
                  fullWidth
                  startIcon={<ItemIcon />}
                  disableElevation
                  sx={{
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    color: '#fff',
                    bgcolor: accent,
                    borderRadius: 1,
                    py: 0.75,
                    px: 1.1,
                    border: '2px solid #212121',
                    outline: active ? '2px solid #212121' : 'none',
                    outlineOffset: 2,
                    '&:hover': {
                      bgcolor: accent,
                      filter: 'brightness(1.05)',
                    },
                  }}
                >
                  {label}
                </Button>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Drawer>
  )
}

export default MobileMenu
