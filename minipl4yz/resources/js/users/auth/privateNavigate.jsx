import { Navigate } from 'react-router-dom';
import { useAuth } from "$/auth/AuthContext";
import { CircularProgress, Box } from "@mui/material";

export default function PrivateRoute({ children }) {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return isAuth
    ? children
    : <Navigate to="/" state={{ message: "Debes iniciar sesion para acceder a este contenido" }} />;
}