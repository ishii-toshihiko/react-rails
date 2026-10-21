import { Box, Typography } from '@mui/material'

const Footer = () => (
  <Box
    component="footer"
    className="footer"
    sx={{
      py: 1.5,
      px: 1,
      textAlign: 'center',
      color: 'text.secondary',
    }}
  >
    <Typography
      component="p"
      sx={{ m: 0, fontSize: { xs: '0.8rem', sm: '0.9rem' }, fontWeight: 500 }}
    >
      Built with React · TypeScript · Vite
      <Box component="span" sx={{ mx: 0.75, opacity: 0.5 }}>
        +
      </Box>
      Rails API
    </Typography>
    <Typography
      component="p"
      sx={{
        m: 0,
        mt: 0.25,
        fontSize: { xs: '0.7rem', sm: '0.75rem' },
        letterSpacing: '0.02em',
        opacity: 0.85,
      }}
    >
      React 19.1 · TS 5.8 · Vite 7.0 · Rails 7.2
    </Typography>
  </Box>
)

export default Footer
