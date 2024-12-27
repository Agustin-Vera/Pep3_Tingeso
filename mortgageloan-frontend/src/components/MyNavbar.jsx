import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import NavbarMenu from "./NavbarMenu";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function MyNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#345" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <AccountBalanceIcon sx={{ marginRight: 2 }} />
              PrestaBanco
            </Typography>
            <Button color="inherit" onClick={() => navigate("/user/add")}>
              <PersonAddIcon sx={{ marginRight: 1 }} />
              Registrarse
            </Button>
          </Toolbar>
        </AppBar>
        <NavbarMenu open={open} toggleDrawer={toggleDrawer} />
      </Box>
    </>
  );
}
