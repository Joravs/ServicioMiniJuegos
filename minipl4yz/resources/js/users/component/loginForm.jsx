import * as React from 'react';
import { Box,FormControl, TextField, InputLabel,OutlinedInput,InputAdornment,
    IconButton,Card} from '@mui/material';
import {Visibility,VisibilityOff  } from '@mui/icons-material'

export default function LoginForm() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    return (
        <Box>
            <Card
                sx={{
                    m: 'auto',
                    width: '40vw',
                    height: '50vh',
                    backgroundColor: '#514559',
                    alignSelf:'center',
                }}
            >
                <FormControl sx={{m:2,}}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Nombre de Usuario"
                        placeholder="MiniPl4yz"
                        variant='filled'
                        color='primary'
                    />
                </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
            </Card>
        </Box>
    )
}