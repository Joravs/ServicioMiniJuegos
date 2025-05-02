import React, { useState } from 'react';
import {
  Box, Tabs, Tab, Typography, LinearProgress,
  FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Card, Button, Snackbar, Alert
} from '@mui/material';
import 'animate.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useUser } from '$/auth/UserContext';
import getCsrfToken from '@/hooks/getToken'
import APP__URL from '@/hooks/variables';
import apiFetch from '@/hooks/apiFetch';
import { Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ProfileView = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { user } = useUser();
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || '/uploads/avatars/default.png');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = async () => {
    const result = await apiFetch(APP__URL + '/api/handlePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

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

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    if (file.size > 2048 * 1024) {
      setSnackbarMessage('El archivo supera el tamaño máximo permitido de 2MB.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setSnackbarMessage('Formato no permitido. Solo se aceptan JPEG, PNG, JPG, GIF y WEBP.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    const formData = new FormData();
    formData.append('avatar', file);
  
    const result = await apiFetch(APP__URL + '/api/updateAvatar', {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': getCsrfToken(),
      },
      body: formData,
    });

    if (result.success) {
      setSelectedAvatar(result.avatarUrl);
      setSnackbarMessage('Avatar actualizado correctamente.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('Error al actualizar el avatar.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
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
      <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', my: 3 }}>
        <Avatar
          alt={user.nombre}
          src={selectedAvatar}
          sx={{ width: 140, height: 140, cursor: 'pointer', border: '3px solid #21BFAF' }}
          className="animate__animated animate__fadeIn"
          onClick={() => document.getElementById('avatar-upload-input').click()}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 'calc(50% - 70px)',
            backgroundColor: '#21BFAF',
            borderRadius: '50%',
            padding: 1,
            cursor: 'pointer',
            '&:hover': { backgroundColor: '#1da899' },
          }}
          onClick={() => document.getElementById('avatar-upload-input').click()}
        >
          <EditIcon sx={{ color: 'black' }} />
        </Box>
        <input
          type="file"
          id="avatar-upload-input"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleAvatarChange}
        />
      </Box>
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