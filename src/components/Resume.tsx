import Typography from '@mui/material/Typography'
import { Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@mui/lab'

import {
  Person as PersonIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  EmojiPeople as EmojiPeopleIcon,
  Storefront as StorefrontIcon,
  PersonRemoveAlt1 as PersonRemoveAlt1Icon,
} from '@mui/icons-material'

const Resume=()=>{
  const resumeItems = [
    { icon:<PersonIcon/>,date:'1958年〇月〇〇日',label: '生年月日', note: '67歳', backColor: 'green', color: '#fff' },
    { icon:<SchoolIcon/>,date:'1981年3月',label: '大学卒業', note: 'K工業大学 工学部 電気工学科卒業', backColor: 'deepskyblue', color: '#fff' },
    { icon:<BusinessIcon/>,date:'1981年4月',label: '就職', note: 'T株式会社入社（正社員）', backColor: 'sienna', color: '#fff' },
    { icon:<PersonRemoveAlt1Icon/>,date:'2019年8月',label: '再雇用', note: 'T株式会社　定年後再雇用（嘱託社員）', backColor: 'royalblue', color: '#fff' },
    { icon:<EmojiPeopleIcon/>,date:'2023年8月',label: '退職', note: 'T株式会社　再雇用契約期間満了により退職', backColor: 'cadetblue', color: '#fff' },
    { icon:<StorefrontIcon/>,date:'2024年1月',label: '開業', note: 'ワークIT（個人事業）開業', backColor: 'darkorange', color: '#fff' },
  ]
  return(

    <Timeline position="alternate">
      {resumeItems.map(({ icon,date,label,note,backColor,color }) => (
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {date}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: backColor, color: color }}>
              {icon}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent
            sx={{
              py: '12px',
              px: 2,
            }}
          >
            <Typography
              variant="h5"
              component="span"
              sx={{
                color:'blue',
                fontWeight:'bold',
              }}
            >
              {label}
            </Typography>
            <Typography>
              {note}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>

  )
}
export default Resume