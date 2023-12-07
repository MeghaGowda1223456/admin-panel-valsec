import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Link as RouterLink } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Import an icon to indicate submenus
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Icon for collapsed submenu

// eslint-disable-next-line import/order, import/no-unresolved
import navConfig from 'src/layouts/dashboard/nav/config';

function NavSection() {
  const [selectedItem, setSelectedItem] = useState('');

  const [selectedSubItem, setSelectedSubItem] = useState('');
  const [expandedSubmenu, setExpandedSubmenu] = useState('');

  const handleItemClick = (itemTitle) => {
    console.log(itemTitle);
    if (expandedSubmenu === itemTitle) {
      // Close the submenu if it's already open
      setExpandedSubmenu('');
    } else {
      setExpandedSubmenu(itemTitle);
    }
    setSelectedItem(itemTitle);
  };
  // const handleItemClick = (itemTitle) => {
  //   setSelectedItem(itemTitle);
  // };
  const handleSubmenuItemClick = (item) => {
    console.log(item);
    setSelectedSubItem(item);
  };
  const renderSubMenuItems = (submenuItems) => {
    return submenuItems.map((submenuItem) => (
      <ListItem
        key={submenuItem.title}
        button
        component={RouterLink}
        to={submenuItem.path}
        sx={{
          pl: 4,
          '&.menu-item-active': {
            backgroundColor: '#d3f4fd',
            color: '#001357',
            fontWeight: 'bold',
          },
        }}
        className={selectedSubItem === submenuItem.title ? 'menu-item-active' : ''}
        onClick={() => handleSubmenuItemClick(submenuItem.title)}
      >
        <ListItemIcon>{submenuItem.icon}</ListItemIcon>
        <ListItemText primary={submenuItem.title} />
      </ListItem>
    ));
  };

  const renderNavItems = () => {
    return navConfig.map((item) => (
      <React.Fragment key={item.title}>
        <ListItem
          button
          onClick={() => handleItemClick(item.title)}
          component={RouterLink}
          to={item.path}
          sx={{
            '&.menu-item-active': {
              backgroundColor: '#d3f4fd',
              color: '#001357',
              fontWeight: 'bold',
            },
          }}
          className={selectedItem === item.title ? 'menu-item-active' : ''}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
          {item.items && (
            <ListItemIcon sx={{ marginLeft: 'auto' }}>
              {expandedSubmenu === item.title ? (
                <ExpandMoreIcon /> // Display ExpandMoreIcon when submenu is expanded
              ) : (
                <ChevronRightIcon /> // Display ChevronRightIcon when submenu is collapsed
              )}
            </ListItemIcon>
          )}
        </ListItem>
        {item.items && (
          <Collapse in={expandedSubmenu === item.title} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderSubMenuItems(item.items)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return <List>{renderNavItems()}</List>;
}

export default NavSection;
