import { useMediaQuery, Box, Typography, Button } from '@mui/material'
import MobileMenu from "./MobileMenu"
import DesktopMenu from "./DesktopMenu"
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../apis/userSignOut';

type HeaderProps = {
  loggedIn: boolean;
};

const Header = ({loggedIn}:HeaderProps)=>{
  const navigate = useNavigate()
  const handleSignOut =()=>{
    signOutUser()
    navigate("/")
  }
  const handleSignIn =()=>{
    navigate("/v1/auth")
  }

  const isMobile = useMediaQuery('(max-width:600px)');
  return loggedIn ?(
    <>
      <Box sx={{display:'flex'}}>
        <Button variant="outlined" onClick={handleSignOut} sx={{ml: 'auto'}}>
          ログアウト
        </Button>
      </Box>
      <link href="https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap" rel="stylesheet"></link>
      <Box className={'header responsive-box'}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 2,fontWeight: 900, }}>
          Works I.T
        </Typography>
        <Typography variant="h5" component="div" sx={{ flexGrow: 2 }}>
          Ishii&apos;s Portfolio
        </Typography>
      </Box>
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
      <Box className={'header responsive-box'}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 2,fontWeight: 900, }}>
          Works I.T
        </Typography>
        <Typography variant="h5" component="div" sx={{ flexGrow: 2 }}>
          Ishii&apos;s Portfolio
        </Typography>
      </Box>
    </>
  )
}
export default Header