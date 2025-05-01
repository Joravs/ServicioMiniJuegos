import { Navigate } from 'react-router-dom';
import { useUser } from "$/auth/UserContext.jsx";

export default function WebAdmin({ children }) {
  const { user } = useUser();

  return user.id===1
    ? children
    : <Navigate to="/" state={{ message: "No tienes acceso a este contenido" }} />;
}