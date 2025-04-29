import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '$/auth/AuthContext';
import APP__URL from '@/hooks/variables';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fecthLogout = async ()=>{
        const response = await fetch(APP__URL+'/api/logout')
        const logout = await response.json()
    }
    fecthLogout()
    logout();
    navigate('/');
  }, []);

  return null;
}