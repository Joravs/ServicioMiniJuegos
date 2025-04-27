import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '$/auth/AuthContext';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fecthLogout = async ()=>{
        const response = await fetch('https://minipl4yz.duckdns.org/api/logout')
        const logout = await response.json()
    }
    fecthLogout()
    logout();
    navigate('/');
  }, []);

  return null;
}