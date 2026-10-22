import { useMediaQuery, Box, Typography, Button, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'
import { useNavigate, useLocation } from 'react-router-dom'
import { signOutUser } from '../apis/userSignOut'
import { recordPageView } from '../apis/recordPageView'
import { useEffect, useState } from 'react'
import brandMark from '../assets/logo/works-it-mark-pc-person-laptop.svg'

type HeaderProps = {
  loggedIn: boolean
}

const BRAND = '#00838f'
const BRAND_INK = '#004d40'

const Header = ({ loggedIn }: HeaderProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [viewCount, setViewCount] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleSignOut = () => {
    signOutUser()
    navigate('/')
  }
  const handleSignIn = () => {
    navigate('/v1/auth')
  }

  useEffect(() => {
    if (!isHome) {
      setViewCount(null)
      return
    }

    let cancelled = false
    ;(async () => {
      const count = await recordPageView('/')
      if (!cancelled && count !== null) {
        setViewCount(count)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isHome])

  return (
    <Box
      component="header"
      sx={{
        borderBottom: '1.5px solid #9e9e9e',
        background: 'linear-gradient(180deg, #e1f5fe 0%, #fffde7 55%, #ffffff 100%)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: { xs: 1.5, sm: 2 },
          py: { xs: 1.35, sm: 1.65 },
          maxWidth: 960,
          mx: 'auto',
          width: '100%',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.25 } }}>
            <Box
              component="img"
              src={brandMark}
              alt=""
              sx={{
                width: { xs: 40, sm: 48, md: 52 },
                height: { xs: 40, sm: 48, md: 52 },
                borderRadius: 1.5,
                flexShrink: 0,
              }}
            />
            <Typography
              component="div"
              sx={{
                m: 0,
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: { xs: '1.85rem', sm: '2.35rem', md: '2.6rem' },
                letterSpacing: '0.06em',
                lineHeight: 1.05,
                color: '#000',
                textShadow: '1px 2px 4px rgba(0, 0, 0, 0.18), 0 1px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              Works I.T
            </Typography>
          </Box>
          <Typography
            component="div"
            sx={{
              m: 0,
              mt: 0.35,
              ml: { xs: 1.5, sm: 2.5 },
              fontSize: { xs: '0.88rem', sm: '1rem' },
              fontWeight: 700,
              color: '#263238',
              letterSpacing: '0.05em',
            }}
          >
            Ishii Toshihiko&apos;s Portfolio
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
          {loggedIn && isMobile && (
            <IconButton
              aria-label="メニューを開く"
              onClick={() => setMobileOpen(true)}
              size="small"
              sx={{
                color: '#757575',
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: 1,
                border: '1px solid #bdbdbd',
                '&:hover': {
                  color: '#616161',
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                  borderColor: '#9e9e9e',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {loggedIn ? (
            <Button
              variant="outlined"
              size="small"
              onClick={handleSignOut}
              sx={{
                textTransform: 'none',
                whiteSpace: 'nowrap',
                borderWidth: 2,
                borderColor: BRAND_INK,
                color: BRAND_INK,
                fontWeight: 700,
                bgcolor: '#fff',
                '&:hover': {
                  borderWidth: 2,
                  borderColor: BRAND,
                  bgcolor: '#e0f7fa',
                  color: BRAND,
                },
              }}
            >
              ログアウト
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={handleSignIn}
              disableElevation
              sx={{
                textTransform: 'none',
                whiteSpace: 'nowrap',
                fontWeight: 700,
                bgcolor: BRAND,
                color: '#fff',
                border: `2px solid ${BRAND_INK}`,
                '&:hover': { bgcolor: BRAND_INK },
              }}
            >
              ログインページへ
            </Button>
          )}
        </Box>

        {isHome && viewCount !== null && (
          <Typography
            component="span"
            aria-label={`アクセス数 ${viewCount}`}
            sx={{
              position: 'absolute',
              right: { xs: 12, sm: 16 },
              bottom: 4,
              fontSize: '0.65rem',
              fontWeight: 400,
              color: 'rgba(0, 0, 0, 0.38)',
              letterSpacing: '0.02em',
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {viewCount.toLocaleString('ja-JP')} views
          </Typography>
        )}
      </Box>

      {loggedIn && !isMobile && <DesktopMenu />}
      {loggedIn && isMobile && (
        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      )}
    </Box>
  )
}

export default Header
