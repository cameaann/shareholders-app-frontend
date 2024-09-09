import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ModalClose,
} from "@mui/joy";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const MobileNavbar = ({ onMenuSelect }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleMenuClick = (menuItem) => {
    onMenuSelect(menuItem);
    toggleMenu();
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <img
        src="https://ric.phz.fi/aHR0cHM6Ly9waHouZmkvYXBwL3VwbG9hZHMvMjAxOC8wMS9jcm9wcGVkLWZ1bGxzdGFja2xvZ28tMi5wbmc=?width=1920"
        alt="Logo"
        style={{ width: "150px", height: "auto" }}
      />

      <IconButton onClick={toggleMenu}>
        <GiHamburgerMenu size={24} />
      </IconButton>

      <Drawer anchor="right" open={menuOpen} onClose={toggleMenu}>
        <ModalClose />
        <Box
          sx={{
            padding: 2,
          }}
        >
          <List>
            <ListItem>
              <ListItemButton onClick={() => handleMenuClick("Osakasluettelo")}>
                Osakasluettelo
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => handleMenuClick("Osakenumerot")}>
                Osakenumerot
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => handleMenuClick("Historia")}>
                Historia
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => handleMenuClick("Lisää uusi omistaja")}
              >
                Lisää uusi omistaja
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => handleMenuClick("Osakkeen siirto")}
              >
                Osakkeen siirto
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MobileNavbar;
