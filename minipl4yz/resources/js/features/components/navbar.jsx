import { useEffect, useState } from "react";
import { useAuth } from '$/auth/AuthContext';
import { Link } from "react-router-dom";
import * as React from "react";
import {
  AppBar, Box, Toolbar, IconButton, Typography, Drawer,
  List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText,
  TextField, Paper, List as MUIList, ListItem as MUIListItem,
} from "@mui/material";

import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import StarIcon from '@mui/icons-material/Star';

const NavBar = () => {
  const [title, setTitle] = useState("MiniPl4yz");
  const { isAuth, checkLogin } = useAuth();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({ games: [] , gamesFav: []});
  const [filteredGames, setFilteredGames] = useState([]);

  const fetchdata = async () => {
    const response = await fetch('/api/index');
    const data = await response.json();
    setResult(data.games);
  };

  useEffect(() => {
    checkLogin();
    fetchdata();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() !== "") {
      const filtered = result.filter((game) =>
        game.nombre.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGames(filtered);
    } else {
      setFilteredGames([]);
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon className="textos" />
            </ListItemIcon>
            <ListItemText className="textos" primary="Inicio" />
          </ListItemButton>
        </ListItem>

        {isAuth ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/stats">
                <ListItemIcon>
                  <BarChartIcon className="textos" />
                </ListItemIcon>
                <ListItemText className="textos" primary="Estadísticas" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/fav">
                <ListItemIcon>
                  <StarIcon className="textos" />
                </ListItemIcon>
                <ListItemText className="textos" primary="Juegos Favoritos" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/my-profile">
                <ListItemIcon>
                  <PersonIcon className="textos" />
                </ListItemIcon>
                <ListItemText className="textos" primary="Mi Perfil" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/logout">
                <ListItemIcon>
                  <LogoutIcon className="textos" />
                </ListItemIcon>
                <ListItemText className="textos" primary="Cerrar Sesión" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemIcon>
                  <LoginIcon className="textos" />
                </ListItemIcon>
                <ListItemText className="textos" primary="Iniciar Sesión" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/register">
                <ListItemIcon>
                  <AppRegistrationIcon className="textos" />
                </ListItemIcon>
                <ListItemText className="textos" primary="Registrarse" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#514559" }}>
        <Toolbar>
          <Link to="/">
            <img src="favicon.png" alt="logo" style={{ width: 32, marginRight: 12 }} />
          </Link>
          <Typography
            className="Titulo"
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer", display: {xs:'none',sm: 'block'},}}
            onMouseEnter={() => setTitle("Juega Ya!!")}
            onMouseLeave={() => setTitle("MiniPl4yz")}
          >
            {title}
          </Typography>

          <Box sx={{ position: 'relative', mr: 2 }}>
            <TextField
              size="small"
              placeholder="Buscar juegos..."
              value={query}
              onChange={handleSearch}
              sx={{ backgroundColor: "transparent", borderRadius: 2, width: 200 }}
            />
            {filteredGames.length > 0 && (
              <Paper sx={{ position: "absolute", top: 40, left: 0, zIndex: 10, width: 200 }}>
                <MUIList dense>
                  {filteredGames.map((game) => (
                    <MUIListItem
                      button
                      key={game.id}
                      component={Link}
                      to={`/catalog/${game.nombre}`}
                      onClick={() => setQuery("")}
                    >
                      {game.nombre}
                    </MUIListItem>
                  ))}
                </MUIList>
              </Paper>
            )}
          </Box>

          <IconButton size="large" edge="end" color="inherit" onClick={toggleDrawer(true)}>
            <DensityMediumIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { backgroundColor: "#382f42", color: "#fff" } }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
};

export default NavBar;