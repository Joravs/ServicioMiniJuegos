import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '$/auth/AuthContext';
import {
  Box, FormControl, InputLabel, OutlinedInput, InputAdornment,
  IconButton, Card, Button, Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import getToken from '@/hooks/getToken'


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username,setUsername] = useState('')
  const [usernames,setUsernames] = useState([])
  const [password,setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const fetchUsername= async()=>{
    const usernames = await fetch('/api/user/check',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getToken(),},
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
    const response = await fetch('/api/loginForm',{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getToken(),},
        body: JSON.stringify({username: username, password: password}),
    })
    const result = await response.json()
    return result.Auth
  }
  const handleFormSubmit = async (event)=>{
    event.preventDefault();
    let auth = await fetchLogin();
    if (auth){
        login();
        navigate('/')
    }else{
        console.log("Ha ocurrido un problema")
    }
  }

  useEffect(()=>{
    fetchUsername()
  },[])
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
          Iniciar Sesión
        </Typography>

        <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="username" sx={{ color: '#fff' }}>
            Nombre de Usuario
          </InputLabel>
        <OutlinedInput
            error={username && !usernames.some(user => user.username === username)}
            helperText={
                username && !usernames.some(user => user.username === username)
                  ? 'Usuario no registrado'
                  : ''
              }
            id="username"
            type='text'
            label="Nombre de Usuario"
            sx={{
              backgroundColor: 'transparent',
            }}
            onChange={(e)=> handleUsernameCheck(e.target.value)}
          />
        </FormControl>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="password" sx={{ color: '#fff' }}>
            Contraseña
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
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
    </Box>
  );
}