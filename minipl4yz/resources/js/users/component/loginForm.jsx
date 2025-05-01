import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '$/auth/AuthContext';
import {
  Box, FormControl, InputLabel, OutlinedInput, InputAdornment,
  IconButton, Card, Button, Typography, Snackbar, Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import getCsrfToken from '@/hooks/getToken'
import APP__URL from '@/hooks/variables';
import { useUser } from '$/component/levels/UserContext';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username,setUsername] = useState('')
  const [usernames,setUsernames] = useState([])
  const [password,setPassword] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const { login } = useAuth()
  const { setUserData } = useUser();
  const navigate = useNavigate()
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const fetchUsername= async()=>{
    const usernames = await fetch(APP__URL+'/api/user/check',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),},
    })
    const response = await usernames.json()
    setUsernames(response.usernames)
  }

  const handleUsernameCheck= (username)=>{
    if (usernames.some(user=> user.username===username)) {
        setUsername(username)
    }
  }
  const handlePassword = (password) =>{
    setPassword(password)
  }

  const fetchLogin = async ()=>{
    const response = await fetch(APP__URL+'/api/loginForm',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),},
        body: JSON.stringify({username: username, password: password}),
    })
    const result = await response.json()
    return result
  }
  const handleFormSubmit = async (event)=>{
    event.preventDefault();
    let auth = await fetchLogin();
    if (auth.auth){
        setUserData(auth);
        login();
        navigate('/')
    }else{
      setSnackbarMessage('Usuario o Contraseña Incorrectos');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }

  useEffect(()=>{
    fetchUsername()
  },[])
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
          Iniciar Sesión
        </Typography>

        <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="username" sx={{ color: '#fff' }}>
            Nombre de Usuario
          </InputLabel>
        <OutlinedInput
            id="username"
            type='text'
            label="Nombre de Usuario"
            className="animate__animated animate__fadeInUp"
            sx={{
              backgroundColor: 'transparent',
            }}
            onChange={(e)=> handleUsernameCheck(e.target.value)}
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
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="password" sx={{ color: '#fff' }}>
            Contraseña
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            className="animate__animated animate__fadeInUp"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Contraseña"
            sx={{
              backgroundColor: 'transparent',
            }}
            onChange={(e)=>handlePassword(e.target.value)}
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
        <Button 
            variant="contained" 
            sx={{backgroundColor:'#21BFAF', color:'black',}} 
            fullWidth
            onClick={handleFormSubmit}>
          Iniciar Sesión
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