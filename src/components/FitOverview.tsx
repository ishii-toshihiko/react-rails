import { Box, Button, Divider, alpha } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import type { ReactNode } from 'react'
import { contactAccent } from '../data/navItems'

const Heading = ({
  icon,
  children,
  component = 'h3',
  className,
  fontSize = '1rem',
  iconColor,
}: {
  icon: ReactNode
  children: ReactNode
  component?: 'h2' | 'h3'
  className?: string
  fontSize?: string
  iconColor: string
}) => (
  <Box
    component={component}
    className={className}
    sx={{
      m: 0,
      mb: component === 'h2' ? 1 : 0.5,
      fontSize,
      display: 'flex',
      alignItems: 'center',
      gap: 0.75,
    }}
  >
    <Box component="span" sx={{ display: 'inline-flex', color: iconColor, lineHeight: 0 }}>
      {icon}
    </Box>
    {children}
  </Box>
)

const sectionPad = {
  px: 1.5,
  py: 1.25,
} as const

/** 発注者が短時間で向き不向きを把握するための案内 */
const FitOverview = () => (
  <Box
    className="fit-overview"
    sx={{
      width: { xs: '100%', sm: '80%', md: '60%' },
      mx: 'auto',
      mt: 2,
      mb: 2,
      px: 1.5,
      py: 1.5,
      display: 'flex',
      flexDirection: 'column',
      gap: 1.75,
    }}
  >
    <Box>
      <Heading
        component="h2"
        className="fit-overview-title"
        fontSize="1.1rem"
        iconColor="primary.main"
        icon={<WorkOutlineIcon fontSize="small" />}
      >
        できること・案件の向き不向き
      </Heading>
      <Box component="p" sx={{ m: 0, lineHeight: 1.6 }}>
        Web（Rails / React）を中心に、認証・フォーム・API・本番デプロイまで一貫して対応できます。
        回路・FPGA の現場経験もあります。
      </Box>
    </Box>

    <Box
      sx={{
        ...sectionPad,
        borderLeft: 3,
        borderColor: 'success.main',
        bgcolor: (theme) => alpha(theme.palette.success.main, 0.06),
        borderRadius: 1,
      }}
    >
      <Heading iconColor="success.main" icon={<CheckCircleOutlineIcon fontSize="small" />}>
        向いている案件
      </Heading>
      <Box component="ul" sx={{ m: 0, pl: 2.5, lineHeight: 1.6 }}>
        <li>Rails API + React の小〜中規模 Web</li>
        <li>認証・お問合せ・メール・簡単な計測を含むサイト</li>
        <li>Cloud Run / Hosting などコンテナ・静的配信込みの構築</li>
      </Box>
    </Box>

    <Box
      sx={{
        ...sectionPad,
        borderLeft: 3,
        borderColor: 'error.main',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.06),
        borderRadius: 1,
      }}
    >
      <Heading iconColor="error.main" icon={<HighlightOffIcon fontSize="small" />}>
        向いていない案件
      </Heading>
      <Box component="ul" sx={{ m: 0, pl: 2.5, lineHeight: 1.6 }}>
        <li>大規模チーム前提の超大規模基幹システム</li>
        <li>ネイティブアプリ（iOS / Android）中心の開発</li>
        <li>ドメイン知識が主体で、実装がごく薄い案件のみ</li>
      </Box>
    </Box>

    <Box
      sx={{
        ...sectionPad,
        borderLeft: 3,
        borderColor: contactAccent,
        bgcolor: alpha(contactAccent, 0.06),
        borderRadius: 1,
      }}
    >
      <Heading iconColor={contactAccent} icon={<MailOutlineIcon fontSize="small" />}>
        想定規模とご連絡
      </Heading>
      <Box component="p" sx={{ m: 0, mb: 1.25, lineHeight: 1.6 }}>
        想定は小〜中規模の Rails API + React です。案件のご相談はお問い合わせフォームからどうぞ（実メールはサイトに公開していません）。
      </Box>
      <Button
        component={RouterLink}
        to="/contact"
        variant="contained"
        size="small"
        disableElevation
        sx={{
          textTransform: 'none',
          fontWeight: 700,
          bgcolor: contactAccent,
          '&:hover': { bgcolor: contactAccent, filter: 'brightness(0.92)' },
        }}
      >
        お問い合わせへ
      </Button>
    </Box>

    <Divider />
  </Box>
)

export default FitOverview
