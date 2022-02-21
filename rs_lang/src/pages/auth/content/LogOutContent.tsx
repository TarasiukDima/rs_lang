import React, { FC } from "react";
import ApiContextWrapper from "../../../hoc/ApiContextWrapper";
import { LOCASTORAGE__NAME_USER, LOCASTORAGE__STATISTIC_PAG, LOCASTORAGE__USER_STATISTIC, LOCASTORAGE__VOC_CAT, LOCASTORAGE__VOC_HIDDEN_TAB, LOCASTORAGE__VOC_PAG } from "../../../helpers/consts";
import { removeSettingsLocalStorage } from "../../../helpers/utils";
import { ILogOut } from "../../../types/form";

const LogOutContent: FC<ILogOut> = ({ name, changeUser, changeCategory, updateAllStatistic, serviceApi }: ILogOut) => {
    const clearReduxInfo = () => {
        changeUser({
            id: "",
            name: "",
            token: "",
            refreshToken: "",
            authorization: false,
            wordsSettings: {},
            countNewWords: 0,
            time: -10000000,
        });

        updateAllStatistic({
            learnedWords: 0,
            optional: {
                wordStatistics: {},
                gameStatistics: {
                    sprint: {
                        wrongAnswers: 0,
                        correctAnswers: 0,
                        longestSeries: 0,
                        learnedWords: 0,
                        points: 0,
                    },
                    audio: {
                        wrongAnswers: 0,
                        correctAnswers: 0,
                        longestSeries: 0,
                        learnedWords: 0,
                    },
                },
            },
        });

        changeCategory(0);
    }

    const clearLocalStorage = () => {
        removeSettingsLocalStorage(LOCASTORAGE__NAME_USER);
        removeSettingsLocalStorage(LOCASTORAGE__USER_STATISTIC);
        removeSettingsLocalStorage(LOCASTORAGE__VOC_CAT);
        removeSettingsLocalStorage(LOCASTORAGE__VOC_PAG);
        removeSettingsLocalStorage(LOCASTORAGE__STATISTIC_PAG);
        removeSettingsLocalStorage(LOCASTORAGE__VOC_HIDDEN_TAB);
    }

    const logOutUser = () => {
        clearReduxInfo();
        serviceApi.logOut();
        clearLocalStorage();
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
