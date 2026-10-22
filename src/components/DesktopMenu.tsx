import { Link, useLocation } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import { adminNavItems, navItems } from '../data/navItems'

type DesktopMenuProps = {
  showAdmin?: boolean
}

const DesktopMenu = ({ showAdmin = false }: DesktopMenuProps) => {
  const location = useLocation()
  const items = showAdmin ? [...navItems, ...adminNavItems] : [...navItems]

  return (
    <Box
      component="nav"
      aria-label="メインメニュー"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 1,
        px: 1.5,
        py: 1,
        borderTop: '1px solid #bdbdbd',
        bgcolor: 'transparent',
        maxWidth: 960,
        mx: 'auto',
        width: '100%',
      }}
    >
      {items.map(({ label, path, accent }) => {
        const active = location.pathname === path
        return (
          <Button
            key={path}
            component={Link}
            to={path}
            variant="contained"
            disableElevation
            sx={{
              textTransform: 'none',
              fontSize: '0.85rem',
              fontWeight: 800,
              color: '#fff',
              bgcolor: accent,
              borderRadius: 1,
              px: 1,
              py: 0.45,
              width: 108,
              minWidth: 108,
              border: '2px solid #212121',
              outline: active ? '2px solid #212121' : 'none',
              outlineOffset: 2,
              opacity: active ? 1 : 0.92,
              '&:hover': {
                bgcolor: accent,
                filter: 'brightness(1.05)',
              },
            }}
          >
            {label}
          </Button>
        )
      })}
    </Box>
  )
}

export default DesktopMenu
