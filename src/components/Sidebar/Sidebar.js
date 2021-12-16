import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import Home from '@mui/icons-material/Home';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { ListItem } from '@material-ui/core';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import SidebarData from './SidebarData';
import ItemCard from '../ItemsUI/ItemCard';

function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <Collapse onClick={showSidebar} />
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {SidebarData.map((item, index) => (
            <ListItem key={item} disableGutters>
              <Link to={item.path}>
                <ListItemText primary={item.title} />
              </Link>
            </ListItem>
          ))}
        </List>
      </nav>
    </>
  );
}
export default Sidebar;
