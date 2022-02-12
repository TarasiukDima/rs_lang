import React, { RefObject, useRef, useState } from "react";
import FormInfo from "../../../components/formInfo";
import LabelForm from "../../../components/label";
import {
    AuthFormText,
    LOCASTORAGE__NAME_USER,
    PageLinks,
    submitRegistrText,
} from "../../../helpers/consts";
import { checkFormErrors, saveSettingsLocalStorage } from "../../../helpers/utils";
import { createUser, logInUser } from "../../../services/services";
import { IChangeUserObject, ILocalStoragUser, ILogUserProps, TFormSubmitFC } from "../../../types/form";

const AuthContent = ({ changeUser }: ILogUserProps) => {
    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorSubmint, setErrorSubmint] = useState("");

    const nameUser = useRef() as RefObject<HTMLInputElement>;
    const emailUser = useRef() as RefObject<HTMLInputElement>;
    const passwordUser = useRef() as RefObject<HTMLInputElement>;
    const sumbitButton = useRef() as RefObject<HTMLInputElement>;

    const stopSubmit = (errorText: string) => {
        setErrorSubmint(errorText);
        sumbitButton.current?.setAttribute("disable", "false");
    };

    const checkForm = (emailText: string, passwordText: string, nameText: string) => {
        return !checkFormErrors(
            emailText,
            setErrorEmail,
            passwordText,
            setErrorPassword,
            nameText,
            setErrorName
        );
    };

    const getInputsText = () => {
        const nameText = (nameUser.current as HTMLInputElement).value;
        const emailText = (emailUser.current as HTMLInputElement).value;
        const passwordText = (passwordUser.current as HTMLInputElement).value;

        return {
            nameText,
            emailText,
            passwordText,
        };
    };

    const submitFunction: TFormSubmitFC = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        sumbitButton.current?.setAttribute("disable", "true");
        const { nameText, emailText, passwordText } = getInputsText();

        if (checkForm(emailText, passwordText, nameText)) {
            return stopSubmit("");
        }

        const { id, errorText } = await createUser({
            name: nameText,
            email: emailText,
            password: passwordText,
        });

        if (errorText) {
            return stopSubmit(errorText);
        }

        const { token, errorLoginText, refreshToken } = await logInUser({
            email: emailText,
            password: passwordText,
        });

        if (errorLoginText) {
            return stopSubmit(errorLoginText);
        }

        const refreshUserObj: IChangeUserObject = {
            id: id,
            name: nameText,
            token: token,
            refreshToken: refreshToken,
            authorization: true,
        };

        const objInfo: ILocalStoragUser = {
            ...refreshUserObj,
            email: emailText,
        };

        changeUser(refreshUserObj);
        saveSettingsLocalStorage(LOCASTORAGE__NAME_USER, objInfo);
        stopSubmit("");
    };

    return (
        <>
            <h1 className="title">Регистрация</h1>

            <form className="form" onSubmit={submitFunction}>
                <LabelForm errorText={errorName}>
                    <input
                        ref={nameUser}
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                    />
                </LabelForm>

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
                        value={submitRegistrText}
                    />
                </LabelForm>
            </form>

            <FormInfo
                text={AuthFormText.text}
                pageLink={PageLinks.loginPage}
                textPageLink={AuthFormText.linkText}
            />
        </>
    );
};

export default AuthContent;
