import React from "react";
import { useLocation } from "react-router-dom";
import { PageLinks } from "../../utils";
import AuthContent from "./AuthContent";
import LogInContent from "./LogInContent";
import "./index.scss";


const AuthPage = () => {
    const location = useLocation();

    return (location.pathname === PageLinks.loginPage)
            ? <LogInContent />
            : <AuthContent />
};

export default AuthPage;
