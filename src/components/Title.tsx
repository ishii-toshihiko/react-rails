import { useMediaQuery, Typography  } from '@mui/material'

const Title=()=>{
  const isMobile = useMediaQuery('(max-width:600px)')
  ? (<>信頼される<br />Railsエンジニアへ</>)
  : '信頼される Rails エンジニアへ';

  return(
    <>
      <Typography variant="h4" component="div" sx={{ flexGrow: 2 }}>
        {isMobile}
      </Typography>
    </>
  )
}

export default Title