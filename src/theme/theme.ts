// src/theme/theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,   // スマホ
      md: 768,   // タブレット
      lg: 1024,  // デスクトップ
      xl: 1440,
    },
  },
  typography: {
    h6: {
      fontFamily: 'sans-serif',
      fontWeight: 700,
      fontSize: '3.5rem', 
    },
    h5: {
      fontWeight: 400,
      fontSize: '1.5rem', 
    },
    h4: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: 'white',
      fontStyle: 'italic',
      textShadow: '4px 4px 4px black',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: 'beige',
      textAlign: 'center',
      margin: 30,
    },
    h2: {
      fontWeight: 700,
      fontSize: '1rem',
      color: 'black',
      textAlign: 'center',
      margin: 30,
    },
  },
});

theme = responsiveFontSizes(theme); // 自動で画面サイズに応じて調整
export default theme;