import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, FormControl, InputLabel, OutlinedInput, InputAdornment,
  IconButton, Card, Button, Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import getToken from '@/hooks/getToken';

export default function RegisterForm() {
  const [showPasswd, setShowPasswd] = useState(false);
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [passwd, setPasswd] = useState('');
  const [confirmPasswd, setConfirmPasswd] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwdError, setPasswdError] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPasswd = () => setShowPasswd((show) => !show);

  const handleMouseDownPasswd = (event) => {
    event.preventDefault();
  };

  const fetchUsernames = async () => {
    const response = await fetch('/api/user/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getToken(),
      },
    });
    const data = await response.json();
    setUsernames(data.usernames);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (usernames.some(user => user.username === value)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const handlePasswdChange = (e) => {
    const value = e.target.value;
    setPasswd(value);
    setPasswdError(confirmPasswd !== value);
  };

  const handleConfirmPasswdChange = (e) => {
    const value = e.target.value;
    setConfirmPasswd(value);
    setPasswdError(passwd !== value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (usernameError || passwdError) {
      return;
    }
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getToken(),
      },
      body: JSON.stringify({
        nombre,
        username,
        passwd,
      }),
    });
    const result = await response.json();
    console.log(result)
    if (result.Register) {
      navigate('/login');
    } else {
      console.error('Registration failed:', result.message);
    }
  };

  useEffect(() => {
    fetchUsernames();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
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
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Registro de Usuario
        </Typography>

        <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="nombre" sx={{ color: '#fff' }}>
            Nombre Completo
          </InputLabel>
          <OutlinedInput
            id="nombre"
            type="text"
            label="Nombre Completo"
            sx={{ backgroundColor: 'transparent' }}
            value={nombre}
            onChange={handleNombreChange}
          />
        </FormControl>

        <FormControl fullWidth variant="filled" error={usernameError}>
          <InputLabel htmlFor="username" sx={{ color: '#fff' }}>
            Nombre de Usuario
          </InputLabel>
          <OutlinedInput
            id="username"
            type="text"
            label="Nombre de Usuario"
            sx={{ backgroundColor: 'transparent' }}
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && (
            <Typography variant="caption" color="error">
              El nombre de usuario ya está en uso
            </Typography>
          )}
        </FormControl>

        <FormControl variant="outlined" fullWidth error={passwdError}>
          <InputLabel htmlFor="passwd" sx={{ color: '#fff' }}>
            Contraseña
          </InputLabel>
          <OutlinedInput
            id="passwd"
            type={showPasswd ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPasswd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={handleClickShowPasswd}
                  onMouseDown={handleMouseDownPasswd}
                  edge="end"
                >
                  {showPasswd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña"
            sx={{ backgroundColor: 'transparent' }}
            value={passwd}
            onChange={handlePasswdChange}
          />
        </FormControl>

        <FormControl variant="outlined" fullWidth error={passwdError}>
          <InputLabel htmlFor="confirmPasswd" sx={{ color: '#fff' }}>
            Validar Contraseña
          </InputLabel>
          <OutlinedInput
            id="confirmPasswd"
            type={showPasswd ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPasswd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={handleClickShowPasswd}
                  onMouseDown={handleMouseDownPasswd}
                  edge="end"
                >
                  {showPasswd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Validar Contraseña"
            sx={{ backgroundColor: 'transparent' }}
            value={confirmPasswd}
            onChange={handleConfirmPasswdChange}
          />
          {passwdError && (
            <Typography variant="caption" color="error">
              Las contraseñas no coinciden
            </Typography>
          )}
        </FormControl>

        <Button
          variant="contained"
          sx={{ backgroundColor: '#21BFAF', color: 'black' }}
          fullWidth
          onClick={handleFormSubmit}
          disabled={!nombre || !username || !passwd || usernameError || passwdError}
        >
          Registrarse
        </Button>
      </Card>
    </Box>
  );
}
