import { useMediaQuery, Box, Typography, Button } from '@mui/material'
import MobileMenu from "./MobileMenu"
import DesktopMenu from "./DesktopMenu"
import { useNavigate, useLocation } from 'react-router-dom';
import { signOutUser } from '../apis/userSignOut';
import { recordPageView } from '../apis/recordPageView';
import { useEffect, useState } from 'react';

type HeaderProps = {
  loggedIn: boolean;
};

const Header = ({loggedIn}:HeaderProps)=>{
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [viewCount, setViewCount] = useState<number | null>(null)

  const handleSignOut =()=>{
    signOutUser()
    navigate("/")
  }
  const handleSignIn =()=>{
    navigate("/v1/auth")
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

  const isMobile = useMediaQuery('(max-width:600px)');

  const titleBlock = (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box className={'header responsive-box'}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 2,fontWeight: 900, }}>
          Works I.T
        </Typography>
        <Typography variant="h5" component="div" sx={{ flexGrow: 2 }}>
          Ishii&apos;s Portfolio
        </Typography>
      </Box>
      {isHome && viewCount !== null && (
        <Typography
          component="span"
          aria-label={`アクセス数 ${viewCount}`}
          sx={{
            position: 'absolute',
            right: { xs: 8, sm: 12, md: 16 },
            bottom: 6,
            fontSize: '0.7rem',
            fontWeight: 400,
            fontStyle: 'normal',
            color: 'text.secondary',
            opacity: 0.65,
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
  )

  return loggedIn ?(
    <>
      <Box sx={{display:'flex'}}>
        <Button variant="outlined" onClick={handleSignOut} sx={{ml: 'auto'}}>
          ログアウト
        </Button>
      </Box>
      <link href="https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap" rel="stylesheet"></link>
      {titleBlock}
      {isMobile ? <MobileMenu /> : <DesktopMenu/>}
    </>
  ):(
    <>
    <Box sx={{display:'flex'}}>
        <Button variant="outlined" onClick={handleSignIn} sx={{ml: 'auto'}}>
          ログインページへ
        </Button>
      </Box>
    <link href="https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap" rel="stylesheet"></link>
      {titleBlock}
    </>
  )
}
export default Header
