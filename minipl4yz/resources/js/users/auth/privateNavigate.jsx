import { Navigate } from 'react-router-dom';
import { useAuth } from "$/auth/AuthContext";

export default function PrivateRoute({ children }) {
    const {isAuth} = useAuth()
    return isAuth ? children : <Navigate to="/" state={{ message: "Debes iniciar sesion para acceder a este contenido" }} />;
}
