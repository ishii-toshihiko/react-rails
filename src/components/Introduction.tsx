import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Divider,Paper,Box, Card } from "@mui/material"
import Typography from '@mui/material/Typography'

const Introduction =()=>{
  return(
  
      <Card
          sx={{
            width: {
              xs: '100%',   // スマホ
              sm: '80%',    // タブレット
              md: '60%'     // デスクトップ
            },
            mx: 'auto',     // 中央寄せ
            mt: 2
          }}
        >
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            backgroundColor: 'beige'
          }}
        >
          {/* <CardContent sx={{borderColor:'black'}}> */}
          <Accordion sx={{backgroundColor:'beige'}}>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">
                <Box sx={{
                  p: 0.2,
                  backgroundColor: 'purple',
                  borderRadius: 2,
                  color:'white',
                  fontSize:'1.5rem',
                  width: 100,
                  textAlign: 'center'
                }}>
                  自己PR
                </Box>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Divider/>
                <p>　2018年まで１つの企業にて定年まで就業しました。</p>
                <p>自社サービスの開発からサーバ構築(環境構築)までフルスタックエンジニアとして就業してまいりました。</p>
                <p>要件定義、設計、実装、テストまで問題なく行うことができます。</p>
                <p style={{color:'blue'}}>  (PJ例) 構内電話交換機システム、デジタル音響調整卓システム、非常用放送システムの電子回路開発と制御ソフト開発</p>
                <p>　またデータベース正規化・外部データベースとの連携、画面実装、バッチ処理、Linux OS構築とRuby On Rails 環境構築も可能です。</p>
                <p>自社のサーバの運用やVMWare上での環境構築も問題なく行えます。</p>
                <p>クラウド(GCE)上にサーバを立てOSSのE-ラーニングシステムの構築経験もあります。</p>
                <p>2000 年頃よりRuby を使用開始し 新商品開発進捗管理のためLinux サーバとPostgreSQL を活用しました。</p>
                <p>2015 年より業務管理Web サイト構築のためRuby On Rails での開発・運営を開始しました。</p> 
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* </CardContent> */}
        </Paper>
      </Card>
  )
}

export default Introduction