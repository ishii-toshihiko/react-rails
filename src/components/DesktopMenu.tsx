import { Link } from "react-router-dom"
import { Button, Box } from "@mui/material"

const DesktopMenu = () => {
  const menuItems = [
    { label: 'トップ', path: '/', color: 'orange' },
    { label: 'プロフィール', path: '/about', color: 'purple' },
    { label: 'スキル', path: '/skills', color: 'green' },
    { label: '業務職歴', path: '/works', color: 'blue' },
    { label: 'お問い合せ', path: '/contact', color: 'gray' },
  ]
  return (
    <Box className="responsive-box">
      {menuItems.map(({ label, path, color }) => (
        <Link to={path} key={path}>
          <Button
            variant="contained"
            color="primary"
            className="menu-button"
            style={{ backgroundColor: color,margin: 2,fontSize:'0.8rem' }}
          >
            {label}
          </Button>
        </Link>
      ))}
    </Box>
  );
};


export default DesktopMenu