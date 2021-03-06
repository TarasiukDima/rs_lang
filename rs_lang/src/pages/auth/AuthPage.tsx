import React, { Dispatch } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import SectionContent from "../../components/section";
import AuthContent from "./content/AuthContent";
import LogInContent from "./content/LogInContent";
import LogOutContent from "./content/LogOutContent";

import { PageLinks } from "../../helpers/consts";
import { changeUserInformation } from "../../store/actions/actionsUser";

import { IAction, IState } from "../../types/redux";
import { IChangeUserObject, IFormPageProps } from "../../types/form";

import "./index.scss";

const AuthPage = ({
    name,
    authorization,
    changeUser,
}: IFormPageProps) => {
    const location = useLocation();

    return (
        <SectionContent nameClass="authorization__section">
            {authorization
                ? (
                    <LogOutContent
                        name={name}
                        changeUser={changeUser}
                    />
                )
                : location.pathname === PageLinks.loginPage
                    ? (
                        <LogInContent changeUser={changeUser} />
                    ) : (
                        <AuthContent changeUser={changeUser} />
                    )
            }
        </SectionContent>
    );
};

const mapStateToProps = ({ user: { authorization, name } }: IState) => ({
    authorization,
    name,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeUser: (objInfoUser: IChangeUserObject) => {
            dispatch(changeUserInformation(objInfoUser));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
