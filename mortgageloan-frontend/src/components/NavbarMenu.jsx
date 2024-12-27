import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Divider,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AddCardIcon from "@mui/icons-material/AddCard";

export default function NavbarMenu({ open, toggleDrawer }) {
  const navigate = useNavigate();

  const menuList = () => (
    <Box
      role="presentation"
      sx={{ backgroundColor: "#455a64", width: 250, color: "white" }}
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon sx={{ color: "white" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
        <Divider sx={{ backgroundColor: "white" }} />
        <ListItemButton onClick={() => navigate("/creditApplication/simulate")}>
          <ListItemIcon sx={{ color: "white" }}>
            <PriceChangeIcon />
          </ListItemIcon>
          <ListItemText primary="Simular" />
        </ListItemButton>
        <Divider sx={{ backgroundColor: "white" }} />
        <ListItemButton onClick={() => navigate("/creditApplication/add")}>
          <ListItemIcon sx={{ color: "white" }}>
            <AddCardIcon />
          </ListItemIcon>
          <ListItemText primary="Solicitar Crédito" />
        </ListItemButton>
        <Divider sx={{ backgroundColor: "white" }} />
        <ListItemButton onClick={() => navigate("/creditApplication/list")}>
          <ListItemIcon sx={{ color: "white" }}>
            <RequestQuoteIcon />
          </ListItemIcon>
          <ListItemText primary="Administrar Solicitudes" />
        </ListItemButton>
        <Divider sx={{ backgroundColor: "white" }} />
        <ListItemButton onClick={() => navigate("/user/list")}>
          <ListItemIcon sx={{ color: "white" }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Listar Usuarios" />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );
  return (
    <div>
      <Drawer
        anchor="left"
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#263238",
          },
        }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {menuList()}
      </Drawer>
    </div>
  );
}
