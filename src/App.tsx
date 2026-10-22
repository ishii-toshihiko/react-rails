import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Skills from './pages/Skills'
import SkillsAdmin from './pages/SkillsAdmin'
import Works from './pages/Works'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme'
import CssBaseline from '@mui/material/CssBaseline'
import Logins from './pages/Logins'
import { useState, useEffect } from 'react'
import { isAuthenticated } from './lib/auth'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(isAuthenticated())
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route
            path="/admin/skills"
            element={
              <RequireAuth>
                <SkillsAdmin />
              </RequireAuth>
            }
          />
          <Route path="/works" element={<Works />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/v1/auth" element={<Logins />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  )
}

export default App