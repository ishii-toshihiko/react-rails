import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOutUser } from '../../apis/userSignOut';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

// ✅ localStorage から認証状態を判定
const isAuthenticated = (): boolean => {
  const accessToken = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');
  return Boolean(accessToken && client && uid);
};



const Header: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [signedIn, setSignedIn] = useState<boolean>(false);
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setSignedIn(isAuthenticated());
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    const handleSignIn = () => {
        toggleSidebar();
        navigate('/users/sign_in');
    };

    const handleSignOut = () => {
      signOutUser();
      // localStorage のトークンを削除
      localStorage.removeItem('access-token');
      localStorage.removeItem('client');
      localStorage.removeItem('uid');
      setSignedIn(false);
      toggleSidebar();
    };

    const renderAuthItem = () => {
        return signedIn ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="ログアウト" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={handleSignIn}>
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              <ListItemText primary="ログイン" />
            </ListItemButton>
          </ListItem>
        );
      };

    return (
        <Drawer anchor="right" open={isSidebarOpen} onClose={toggleSidebar}>
            <div className="sidebar">
                <DrawerHeader>
                    <IconButton onClick={toggleSidebar}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <List>{renderAuthItem()}</List>
            </div>
        </Drawer>
    );
};

export default Header;