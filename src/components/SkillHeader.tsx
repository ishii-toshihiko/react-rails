import { Card, CardContent, Box, Slide, Fade } from '@mui/material'

const SkillHeader = ({ open }: { open: boolean }) => (
  <Fade in={open} timeout={600}>
    <Slide direction="left" in={open} timeout={600}>
      <Card className='table-container-size skill-card-base'>
          <CardContent sx={{ pb: '8px !important' }}>
            <Box className='experience-title'>
              Web がメイン ｜ 回路・FPGA も対応
            </Box>
            <Box className='experience-catch'>
              Web(Rails/React)を中心に、回路・FPGAも現場で扱ってきたエンジニアです
            </Box>
            <Box className='experience-body' component="aside" aria-label="表についての注釈">
              <p>※ 下の表は経験年数の目安です</p>
              <p>※ カテゴリごとに年数が長い順に並べています</p>
            </Box>
          </CardContent>
      </Card>
    </Slide>
  </Fade>
)

export default SkillHeader
