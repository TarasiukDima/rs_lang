import React, { RefObject, useRef, useState } from "react";
import FormInfo from "../../../components/formInfo";
import LabelForm from "../../../components/label";
import ApiContextWrapper from "../../../hoc/ApiContextWrapper";

import {
    LOCASTORAGE__NAME_USER,
    LOCASTORAGE__USER_STATISTIC,
    LoginFormText,
    PageLinks,
    submitLoginText,
} from "../../../helpers/consts";
import {
    checkFormErrors,
    saveSettingsLocalStorage,
} from "../../../helpers/utils";
import {
    IChangeUserObject,
    ILocalStoragUser,
    ILogUserProps,
    TFormSubmitFC,
} from "../../../types/form";

const LogInContent = ({ changeUser, serviceApi }: ILogUserProps) => {
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorSubmint, setErrorSubmint] = useState("");

    const emailUser = useRef() as RefObject<HTMLInputElement>;
    const passwordUser = useRef() as RefObject<HTMLInputElement>;
    const sumbitButton = useRef() as RefObject<HTMLInputElement>;

    const stopSubmit = (errorText: string) => {
        setErrorSubmint(errorText);
        sumbitButton.current?.setAttribute("disable", "false");
    };

    const submitFunction: TFormSubmitFC = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        sumbitButton.current?.setAttribute("disable", "true");

        const emailText = (emailUser.current as HTMLInputElement).value;
        const passwordText = (passwordUser.current as HTMLInputElement).value;

        if (
            !checkFormErrors(
                emailText,
                setErrorEmail,
                passwordText,
                setErrorPassword
            )
        ) {
            return stopSubmit("");
        }

        const {
            data,
            errorText,
        } = await serviceApi.logInUser({
            email: emailText,
            password: passwordText,
        });

        if (errorText) {
            return stopSubmit(errorText);
        }

        const {data: userWords, errorText: errorUserWords} = await serviceApi.getUserAllWords();
        if (errorUserWords) {
            return stopSubmit(errorUserWords);
        }
        const date = new Date().getTime();
        const refreshUserObj: IChangeUserObject = {
            id: data.userId,
            name: data.name,
            token: data.token,
            refreshToken: data.refreshToken,
            authorization: true,
            wordsSettings: {},
            time: date,
            countNewWords: 0,
        };

        userWords.forEach(({ wordId, optional }) => {
            refreshUserObj.wordsSettings[wordId] = optional;
        });

        const objInfo: ILocalStoragUser = {
            ...refreshUserObj,
            email: emailText,
        };

        if (Object.keys(refreshUserObj.wordsSettings).length > 0) {
            const { data: statistic } = await serviceApi.getUseStatistics();

            if (statistic) {
                saveSettingsLocalStorage(LOCASTORAGE__USER_STATISTIC, statistic);
            }
        }

        changeUser(refreshUserObj);
        saveSettingsLocalStorage(LOCASTORAGE__NAME_USER, objInfo);
        stopSubmit("");
    };

    return (
        <>
            <h1 className="title">Войти</h1>

            <form className="form" onSubmit={submitFunction}>
                <LabelForm errorText={errorEmail}>
                    <input
                        ref={emailUser}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                </LabelForm>

                <LabelForm errorText={errorPassword}>
                    <input
                        ref={passwordUser}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                </LabelForm>

                <LabelForm errorText={errorSubmint}>
                    <input
                        ref={sumbitButton}
                        type="submit"
                        value={submitLoginText}
                    />
                </LabelForm>
            </form>

            <FormInfo
                text={LoginFormText.text}
                pageLink={PageLinks.authPage}
                textPageLink={LoginFormText.linkText}
            />
        </>
    );
};


export default ApiContextWrapper(LogInContent);
