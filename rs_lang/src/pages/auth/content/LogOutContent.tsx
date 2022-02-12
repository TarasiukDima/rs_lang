import React from "react";
import SectionContent from "../../../components/section";
import { LOCASTORAGE__NAME_USER } from "../../../helpers/consts";
import { removeSettingsLocalStorage } from "../../../helpers/utils";
import { ILogOut } from "../../../types/form";

const LogOutContent = ({ name, changeUser }: ILogOut) => {
    const logOutUser = () => {
        changeUser({
            id: "",
            name: "",
            token: "",
            refreshToken: "",
            authorization: false
        });

        removeSettingsLocalStorage(LOCASTORAGE__NAME_USER);
    }


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
