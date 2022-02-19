import React, { FC } from "react";
import { LOCASTORAGE__NAME_USER } from "../../../helpers/consts";
import { removeSettingsLocalStorage } from "../../../helpers/utils";
import ApiContextWrapper from "../../../hoc/ApiContextWrapper";
import { ILogOut } from "../../../types/form";

const LogOutContent: FC<ILogOut> = ({ name, changeUser, changeCategory, serviceApi }: ILogOut) => {
    const logOutUser = () => {
        changeUser({
            id: "",
            name: "",
            token: "",
            refreshToken: "",
            authorization: false,
            wordsSettings: {},
            time: -10000000,
        });

        changeCategory(0);

        serviceApi.logOut();
        removeSettingsLocalStorage(LOCASTORAGE__NAME_USER);
    };

    return (
        <>
            <h1 className="title">Вы авторизованы</h1>

            <p className="user__name">
                <span>Ваш ник:</span> <span className="user__nik">{name}</span>
            </p>

            <button className="button shadow__button logout__button" onClick={logOutUser}>
                <span>Выйти</span>
            </button>
        </>
    );
};


export default ApiContextWrapper(LogOutContent);
