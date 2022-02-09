import React, { Dispatch } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import AuthContent from "./AuthContent";
import LogInContent from "./LogInContent";
import LogOutContent from "./LogOutContent";

import { PageLinks } from "../../helpers/settings";
import { IAction, IState } from "../../types/redux";
import "./index.scss";
import { IFormPageProps } from "../../types/form";
import { changeAuthorization, changeId, changeToken } from "../../store/actions/actionsUser";

const AuthPage = ({
    id,
    token,
    authorization,
    changeUserAuthorization,
    changeUserToken,
    changeUserId,
}: IFormPageProps) => {
    const location = useLocation();

    if (authorization) {
        return (
            <LogOutContent
                changeUserAuthorization={changeUserAuthorization}
                changeUserToken={changeUserToken}
                changeUserId={changeUserId}
            />
        );
    }

    return (
        location.pathname === PageLinks.loginPage
            ? <LogInContent />
            : <AuthContent />
    );
};


const mapStateToProps = ({ user: { id, token, authorization } }: IState) => ({
    id,
    token,
    authorization,
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
