import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, FormControl, InputLabel, OutlinedInput, InputAdornment,
  IconButton, Card, Button, Typography, Snackbar,Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';

export default function RegisterForm() {
  const [showPasswd, setShowPasswd] = useState(false);
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [passwd, setPasswd] = useState('');
  const [confirmPasswd, setConfirmPasswd] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwdError, setPasswdError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleClickShowPasswd = () => setShowPasswd((show) => !show);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleMouseDownPasswd = (event) => {
    event.preventDefault();
  };

  const fetchUsernames = async () => {
    const response = await fetch(APP__URL+'/api/user/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
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
    setUsername(value.toLowerCase());
    if (usernames.some(user => user.username === value)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (password.length < minLength) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!hasUpperCase) {
      return 'La contraseña debe contener al menos una letra mayúscula';
    }
    if (!hasNumber) {
      return 'La contraseña debe contener al menos un número';
    }
    return '';
  };

  const handlePasswdChange = (e) => {
    const value = e.target.value;
    setPasswd(value);
    const validationError = validatePassword(value);
    setPasswdError(validationError);
  };

  const handleConfirmPasswdChange = (e) => {
    const value = e.target.value;
    setConfirmPasswd(value);
    const validationError = validatePassword(passwd);
    setPasswdError(validationError || (passwd !== value));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (usernameError || passwdError) {
      return;
    }
    const response = await fetch(APP__URL+'/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
      },
      body: JSON.stringify({
        nombre,
        username,
        passwd,
      }),
    });
    const result = await response.json();
    if (result.Register) {
      navigate('/login');
    } else {
      setSnackbarMessage('Error al registrarse, vuelva a intentarlo');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchUsernames();
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
        className='animate__animated animate__backInDown'
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
            className="animate__animated animate__fadeInUp"
            sx={{ backgroundColor: 'transparent' }}
            value={nombre}
            onChange={handleNombreChange}
            onFocus={(e) => {
              e.target.classList.remove('animate__pulse');
              e.target.classList.add('animate__animated', 'animate__pulse');
            }}
            onAnimationEnd={(e) => {
              e.target.classList.remove('animate__animated', 'animate__pulse');
            }}
            onBlur={(e) => {
              e.target.classList.remove('animate__animated', 'animate__pulse');
            }}
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
            className="animate__animated animate__fadeInUp"
            sx={{ backgroundColor: 'transparent' }}
            value={username}
            onChange={handleUsernameChange}
            onFocus={(e) => {
              e.target.classList.remove('animate__pulse');
              e.target.classList.add('animate__animated', 'animate__pulse');
            }}
            onAnimationEnd={(e) => {
              e.target.classList.remove('animate__animated', 'animate__pulse');
            }}
            onBlur={(e) => {
              e.target.classList.remove('animate__animated', 'animate__pulse');
            }}
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
            className="animate__animated animate__fadeInUp"
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
            onFocus={(e) => {
              e.target.classList.remove('animate__pulse');
              e.target.classList.add('animate__animated', 'animate__pulse');
            }}
            onAnimationEnd={(e) => {
              e.target.classList.remove('animate__animated', 'animate__pulse');
            }}
            onBlur={(e) => {
              e.target.classList.remove('animate__animated', 'animate__pulse');
            }}
          />
          {passwdError && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
              {typeof passwdError === 'string' ? passwdError : 'Las contraseñas no coinciden'}
            </Typography>
          )}
        </FormControl>

        <FormControl variant="outlined" fullWidth error={passwdError}>
          <InputLabel htmlFor="confirmPasswd" sx={{ color: '#fff' }}>
            Validar Contraseña
          </InputLabel>
          <OutlinedInput
            id="confirmPasswd"
            type={showPasswd ? 'text' : 'password'}
            className="animate__animated animate__fadeInUp"
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
            onFocus={(e) => {
              e.target.classList.remove('animate__pulse');
              e.target.classList.add('animate__animated', 'animate__pulse');
            }}
            onAnimationEnd={(e) => {
              e.target.classList.remove('animate__animated', 'animate__pulse');
            }}
            onBlur={(e) => {
              e.target.classList.remove('animate__animated', 'animate__pulse');
            }}
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
}
