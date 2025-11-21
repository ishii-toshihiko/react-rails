import { Card, CardContent, Box, Slide, Fade } from '@mui/material'

const SkillHeader = ({ open }: { open: boolean }) => (
  <Fade in={open} timeout={600}>
    <Slide direction="left" in={open} timeout={600}>
      <Card className='table-container-size skill-card-base'>
          <CardContent>
            <Box className='experience-title'>
              活かせる経験・知識・技術
            </Box>
            <Box className='experience-body'>
              <p>・Ruby On Rails のプログラミング</p>
              <p>・新規Web サイト構築の経験</p>
              <p>・デジタル/アナログ回路設計とレビュー</p>
            </Box>
          </CardContent>
      </Card>
    </Slide>
  </Fade>
)

export default SkillHeader