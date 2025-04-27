import { useState,useEffect } from "react";
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const [check, setCheck] = useState(false);
      useEffect(() => {
        const CheckLogin = async () => {
          const response = await fetch("https://minipl4yz.duckdns.org/api/checklogin");
          const res = await response.json();
          setCheck(res.Auth);
        };
        CheckLogin();
      }, []);
    return check ? children : <Navigate to="/" />;
}