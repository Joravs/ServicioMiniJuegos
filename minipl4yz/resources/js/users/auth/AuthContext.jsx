import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const response = await fetch("/api/checklogin", {
        credentials: 'include',
      });
      const data = await response.json();
      setIsAuth(data.Auth);
    } catch (e) {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    checkLogin();
  }, []);  

  const login = () => {
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth,loading, login, logout, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
}