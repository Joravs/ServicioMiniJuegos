import React, { useState } from 'react';
import {
  Box, Tabs, Tab, Typography, LinearProgress,
  FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Card, Button, Snackbar, Alert
} from '@mui/material';
import 'animate.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from './levels/UserContext';
import getCsrfToken from '@/hooks/getToken'
import APP__URL from '@/hooks/variables';

const ProfileView = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { user } = useUser();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = async () => {
    const response = await fetch(APP__URL + '/api/handlePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const result = await response.json();
    if (result) {
      setSnackbarMessage('Contraseña actualizada correctamente.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setSnackbarMessage('Error al actualizar la contraseña.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const xpPercent = Math.min((user.xp % 1000) / 1000 * 100, 100);
  const nextLevelXp = (user.xp % 1000) || 1000;

  return (
    <Box
      sx={{
        p: 4,
        mx: 'auto',
        mt: 6,
        borderRadius: 3,
        backgroundColor: 'transparent',
        width: '100%',
      }}
      className="animate__animated animate__fadeInDown"
    >
      <Typography variant="h4" gutterBottom className="titulos">
        Perfil de {user.nombre}
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        centered
        className="animate__animated animate__fadeIn"
      >
        <Tab label="Información" />
        <Tab label="Cambiar Contraseña" />
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {tabValue === 0 && (
          <div className="animate__animated animate__fadeIn">
            <Typography variant="h6" className="titulos">Nombre:</Typography>
            <Typography className="textos">{user.nombre}</Typography>

            <Typography variant="h6" sx={{ mt: 2 }} className="titulos">Username:</Typography>
            <Typography className="textos">{user.username}</Typography>

            <Typography variant="h6" sx={{ mt: 2 }} className="titulos">Nivel:</Typography>
            <Typography className="textos">{user.nivel}</Typography>

            <Typography variant="h6" sx={{ mt: 2 }} className="titulos">Experiencia:</Typography>
            <LinearProgress
              variant="determinate"
              value={xpPercent}
              sx={{ height: 10, borderRadius: 5, mt: 1 }}
            />
            <Typography variant="body2" sx={{ mt: 0.5 }} className="textos">
              {nextLevelXp} / 1000 XP para el siguiente nivel
            </Typography>
          </div>
        )}

        {tabValue === 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              className="animate__animated animate__fadeInUp"
              sx={{
                p: 4,
                width: '90%',
                maxWidth: 400,
                backgroundColor: '#514559',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <Typography variant="h5" sx={{ textAlign: 'center' }} className="titulos">
                Cambiar Contraseña
              </Typography>

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="current-password" sx={{ color: '#fff' }}>
                  Contraseña Actual
                </InputLabel>
                <OutlinedInput
                  id="current-password"
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Contraseña Actual"
                  sx={{ backgroundColor: 'transparent', color: '#fff' }}
                  className="animate__animated animate__fadeInUp"
                />
              </FormControl>

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="new-password" sx={{ color: '#fff' }}>
                  Nueva Contraseña
                </InputLabel>
                <OutlinedInput
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Nueva Contraseña"
                  sx={{ backgroundColor: 'transparent', color: '#fff' }}
                  className="animate__animated animate__fadeInUp"
                />
              </FormControl>

              <Button
                variant="contained"
                sx={{ backgroundColor: '#21BFAF', color: 'black' }}
                onClick={handleChangePassword}
              >
                Cambiar Contraseña
              </Button>
            </Card>
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileView;