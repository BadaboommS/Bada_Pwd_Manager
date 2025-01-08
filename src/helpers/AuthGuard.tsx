import React from 'react';
import { useNavigate } from "react-router";
import { accountService } from "../services/account.service";

const AuthGuard = ({ children } : { children: React.ReactNode }) => {
    const navigate = useNavigate();

    if(!accountService.isLogged() && accountService.getToken() !== null && accountService.getToken() !== undefined){
      navigate("/login");
    }

    return (
    <>
      {children}
    </>
  );
}

export default AuthGuard