import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  const checkLogin = async () => {
    const response = await fetch("/api/checklogin");
    const data = await response.json();
    setIsAuth(data.Auth);
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
    <AuthContext.Provider value={{ isAuth, login, logout, checkLogin }}>
      {children}
    </AuthContext.Provider>
  );
}