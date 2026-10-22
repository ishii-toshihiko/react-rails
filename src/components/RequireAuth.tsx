import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import { isAuthenticated } from '../lib/auth'

type RequireAuthProps = {
  children: ReactNode
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const [checked, setChecked] = useState(false)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    setAllowed(isAuthenticated())
    setChecked(true)
  }, [])

  if (!checked) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={28} aria-label="認証確認中" />
      </Box>
    )
  }

  if (!allowed) {
    return <Navigate to="/v1/auth" replace />
  }

  return <>{children}</>
}

export default RequireAuth
