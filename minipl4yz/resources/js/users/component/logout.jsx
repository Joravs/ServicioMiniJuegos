import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '$/auth/AuthContext';
import { useUser } from '$/auth/UserContext';
import APP__URL from '@/hooks/variables';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { logoutLocal } = useUser();

  useEffect(() => {
    const fetchLogout = async () => await fetch(APP__URL+'/api/logout');
    fetchLogout();
    logout();
    logoutLocal();
    navigate('/');
  }, []);

  return null;
}