import React, { Dispatch } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { PageLinks } from "../../helpers/consts";
import {
    changeAuthorization,
    changeId,
    changeName,
    changeToken,
} from "../../store/actions/actionsUser";

import AuthContent from "./content/AuthContent";
import LogInContent from "./content/LogInContent";
import LogOutContent from "./content/LogOutContent";

import { IAction, IState } from "../../types/redux";
import { IFormPageProps } from "../../types/form";

import "./index.scss";

const AuthPage = ({
    name,
    authorization,
    changeUserAuthorization,
    changeUserToken,
    changeUserId,
    changeUserName,
}: IFormPageProps) => {
    const location = useLocation();

    if (authorization) {
        return (
            <LogOutContent
                name={name}
                changeUserAuthorization={changeUserAuthorization}
                changeUserToken={changeUserToken}
                changeUserId={changeUserId}
                changeUserName={changeUserName}
            />
        );
    }

    return location.pathname === PageLinks.loginPage ? (
        <LogInContent
            changeUserAuthorization={changeUserAuthorization}
            changeUserToken={changeUserToken}
            changeUserId={changeUserId}
            changeUserName={changeUserName}
        />
    ) : (
        <AuthContent
            changeUserAuthorization={changeUserAuthorization}
            changeUserToken={changeUserToken}
            changeUserId={changeUserId}
            changeUserName={changeUserName}
        />
    );
};

const mapStateToProps = ({ user: { authorization, name } }: IState) => ({
    authorization,
    name,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeUserAuthorization: (authorization: boolean) => {
            dispatch(changeAuthorization(authorization));
        },
        changeUserToken: (newToken: string) => {
            dispatch(changeToken(newToken));
        },

        changeUserId: (newId: string) => {
            dispatch(changeId(newId));
        },

        changeUserName: (newName: string) => {
            dispatch(changeName(newName));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
