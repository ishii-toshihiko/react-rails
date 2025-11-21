import { List, ListItem, ListItemText, Divider,ListItemIcon } from "@mui/material"

import {
  Language as LanguageIcon,
  DirectionsCar as DirectionsCarIcon,
  Pool as PoolIcon,
  Colorize as ColorizeIcon,
} from '@mui/icons-material'
import Introduction from '../components/Introduction';
import Resume from '../components/Resume';


const About =()=>{
  return(
    <>
    <Divider/>
    <Introduction/>
    <Resume/>
    <List
      sx={{
        width: {
          xs: '100%',   // スマホ
          sm: '80%',    // タブレット
          md: '60%',    // デスクトップ
        },
        p: 0.5,
        mx: 'auto',
        marginTop: '50px',
        marginBottom: '50px',
      }}
    >
      <Divider/>
      <p>■ 資格</p>
      <ListItem>
        <ListItemIcon>
          <LanguageIcon style={{color:"green"}}/>
        </ListItemIcon>
        <ListItemText>
          語学　TOEIC　L&R　610点取得（2018年12月）
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <DirectionsCarIcon style={{color:"blue"}}/>
        </ListItemIcon>
        <ListItemText>
          普通自動車運転免許（1977年10月）
        </ListItemText>
      </ListItem>

      <Divider/>
      <p>■ 趣味・特技</p>
      <ListItem>
        <ListItemIcon>
          <PoolIcon style={{color:"black"}}/>
        </ListItemIcon>
        <ListItemText>
          日本水泳連盟　泳力検定１級合格（2018年10月）
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <ColorizeIcon style={{color:"black"}}/>
        </ListItemIcon>
        <ListItemText>
          日本剣道連盟　剣道初段取得（19〇〇年）
        </ListItemText>
      </ListItem>
    </List>
    <Divider/>
    </>
  )
}
export default About