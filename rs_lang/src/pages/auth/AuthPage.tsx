import React, { Dispatch } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { ApiContextConsumer } from "../../services/servicesContext";

import { PageLinks } from "../../helpers/consts";
import { changeUserInformation } from "../../store/actions/actionsUser";

import SectionContent from "../../components/section";
import AuthContent from "./content/AuthContent";
import LogInContent from "./content/LogInContent";
import LogOutContent from "./content/LogOutContent";

import { IAction, IState } from "../../types/redux";
import { IChangeUserObject, IFormPageProps } from "../../types/form";

import "./index.scss";

const AuthPage = ({ name, authorization, changeUser }: IFormPageProps) => {
    const location = useLocation();
    if (authorization) {
        return (
            <ApiContextConsumer>
                {(serviceApi) => (
                    <LogOutContent
                        name={name}
                        changeUser={changeUser}
                        serviceApi={serviceApi}
                    />
                )}
            </ApiContextConsumer>
        );
    }

    return (
        <SectionContent nameClass="authorization__section">
            <ApiContextConsumer>
                {(serviceApi) =>
                    location.pathname === PageLinks.loginPage ? (
                        <LogInContent
                            changeUser={changeUser}
                            serviceApi={serviceApi}
                        />
                    ) : (
                        <AuthContent
                            changeUser={changeUser}
                            serviceApi={serviceApi}
                        />
                    )
                }
            </ApiContextConsumer>
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
