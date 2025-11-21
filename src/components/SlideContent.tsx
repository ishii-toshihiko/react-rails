// SlideContent.tsx
import { Box, Typography  } from '@mui/material';
import Title from './Title';

const SlideContent = ({ backgroundImage }: { backgroundImage: string }) => (
  <Box className='slide-content'
    style={{ backgroundImage: `url(${backgroundImage})`}}>
    <Box>
      <Title />
    </Box>
    <Box className='slide-box'>
      {[
        '継続的な改善と学習',
        '信頼と安定のある開発',
        '技術と市場の両面を',
      ].map((text) => (
        <Typography variant="h3" component="div" sx={{ flexGrow: 2 }}>
          {text}
        </Typography>
      ))}
    </Box>
  </Box>
);

export default SlideContent;