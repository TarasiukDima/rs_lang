import React from "react";
import SectionContent from "../../components/section";
import { ILogOutProps } from "../../types/form";

const LogOutContent = ({
    changeUserAuthorization,
    changeUserToken,
    changeUserId,
}: ILogOutProps) => {
    const logOutUser = () => {
        changeUserAuthorization(false);
        changeUserToken("");
        changeUserId("");
    };

    return (
        <SectionContent nameClass="authorization__section">
            <h1 className="title">Вы уже авторизованы</h1>

            <button className="button logout__button" onClick={logOutUser}>
                <span>Выйти</span>
            </button>
        </SectionContent>
    );
};

export default LogOutContent;
