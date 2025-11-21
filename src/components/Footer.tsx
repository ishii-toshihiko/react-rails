import {　Typography } from '@mui/material'

const Footer = ()=>{
  return (
    <>
    <Typography variant="h5" component="div" sx={{ flexGrow: 2 }}>
      <p className="footer table-cell-theme">
        React(19.1.0)Typescript(5.8.3)Vite(7.03) + Rails(7.2.2.1)-API mode
      </p>
    </Typography>
    </>
  )
}
export default Footer