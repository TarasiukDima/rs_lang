import React from "react";
import SectionContent from "../../../components/section";
import { ILogOut } from "../../../types/form";

const LogOutContent = ({ name, changeUser }: ILogOut) => {
    const logOutUser = () => changeUser({
        id: "",
        name: "",
        token: "",
        authorization: false
    });

    return (
        <SectionContent nameClass="authorization__section">
            <h1 className="title">Вы авторизованы</h1>

            <p className="user__name">
                <span>Ваш ник:</span> <span className="user__nik">{name}</span>
            </p>

            <button className="button logout__button" onClick={logOutUser}>
                <span>Выйти</span>
            </button>
        </SectionContent>
    );
};

export default LogOutContent;
