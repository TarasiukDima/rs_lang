import React, { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import ApiContextWrapper from "../../../hoc/ApiContextWrapper";

import { removeSettingsLocalStorage } from "../../../helpers/utils";
import { LOCASTORAGE__NAME_USER, LOCASTORAGE__STATISTIC_PAG, LOCASTORAGE__USER_STATISTIC, LOCASTORAGE__VOC_CAT, LOCASTORAGE__VOC_HIDDEN_TAB, LOCASTORAGE__VOC_PAG } from "../../../helpers/consts";

import { clearAudioState } from "../../../store/actions/actionsAudio";
import { clearGameState } from "../../../store/actions/actionsGame";
import { clearVocabularyState } from "../../../store/actions/actionsPages";
import { clearStatisticState } from "../../../store/actions/actionsStatistic";
import { clearUserState } from "../../../store/actions/actionsUser";

import { IAction, IState } from "../../../types/redux";
import { ILogOut } from "../../../types/form";

const LogOutContent: FC<ILogOut> = ({ name, clearAllState, serviceApi }: ILogOut) => {
    const clearLocalStorage = () => {
        removeSettingsLocalStorage(LOCASTORAGE__NAME_USER);
        removeSettingsLocalStorage(LOCASTORAGE__USER_STATISTIC);
        removeSettingsLocalStorage(LOCASTORAGE__VOC_CAT);
        removeSettingsLocalStorage(LOCASTORAGE__VOC_PAG);
        removeSettingsLocalStorage(LOCASTORAGE__STATISTIC_PAG);
        removeSettingsLocalStorage(LOCASTORAGE__VOC_HIDDEN_TAB);
    }

    const logOutUser = () => {
        clearAllState();
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

const mapStateToProps = ({ user: { authorization, name } }: IState) => ({
    authorization,
    name,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        clearAllState: () => {
            dispatch(clearAudioState());
            dispatch(clearGameState());
            dispatch(clearVocabularyState());
            dispatch(clearStatisticState());
            dispatch(clearUserState());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiContextWrapper(LogOutContent));
