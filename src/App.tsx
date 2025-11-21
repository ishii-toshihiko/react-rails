import { Routes,Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Skills from "./pages/Skills"
import Works from "./pages/Works"
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Logins from "./pages/Logins"
import { useState,useEffect } from "react"


const App=()=>{

  const [loggedIn,setLoggedIn] = useState(false)

  const isAuthenticated = (): boolean => {
    const accessToken = localStorage.getItem('access-token')
    const client = localStorage.getItem('client')
    const uid = localStorage.getItem('uid')
    return Boolean(accessToken && client && uid)
  }

  // ログイン状態を確認
  useEffect(() => {
    setLoggedIn(isAuthenticated())
  })

   return(
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header loggedIn={loggedIn}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/skills" element={<Skills/>}/>
          <Route path="/works" element={<Works/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/v1/auth" element={<Logins/>}/>
        </Routes>
      <Footer/>
      </ThemeProvider>
    </>
  )
}

export default App