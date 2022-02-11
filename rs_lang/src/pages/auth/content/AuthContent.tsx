import React, { RefObject, useRef, useState } from "react";
import FormInfo from "../../../components/formInfo";
import SectionContent from "../../../components/section";
import {
    AuthFormText,
    PageLinks,
    submitRegistrText,
} from "../../../helpers/consts";
import {
    validateEmail,
    validateForm,
    validateName,
    validatePassword,
} from "../../../helpers/utils";
import { createUser, logInUser } from "../../../services/services";
import { ILogUserProps, TFormSubmitFC } from "../../../types/form";

const AuthContent = ({
    changeUserAuthorization,
    changeUserToken,
    changeUserId,
    changeUserName,
}: ILogUserProps) => {
    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorSubmint, setErrorSubmint] = useState("");

    const nameUser = useRef() as RefObject<HTMLInputElement>;
    const emailUser = useRef() as RefObject<HTMLInputElement>;
    const passwordUser = useRef() as RefObject<HTMLInputElement>;
    const sumbitButton = useRef() as RefObject<HTMLInputElement>;

    const checkFormErrors = (
        inputEmail: HTMLInputElement,
        inputPassword: HTMLInputElement,
        inputName: HTMLInputElement
    ) => {
        const {
            name: errNameText,
            email: errEmailText,
            password: errPasswordText,
        } = validateForm(inputEmail, inputPassword, inputName);

        errNameText ? setErrorName(errNameText) : setErrorName("");
        errEmailText ? setErrorEmail(errEmailText) : setErrorEmail("");
        errPasswordText
            ? setErrorPassword(errPasswordText)
            : setErrorPassword("");

        if (errNameText || errEmailText || errPasswordText) {
            return false;
        }

        return true;
    };

    const changeUserInfo = (
        id: string,
        name: string,
        token: string,
        authorization: boolean
    ) => {
        changeUserId(id);
        changeUserName(name);
        changeUserToken(token);
        changeUserAuthorization(authorization);
    };

    const submitFunction: TFormSubmitFC = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        sumbitButton.current?.setAttribute("disable", "true");

        const inputName = nameUser.current as HTMLInputElement;
        const inputEmail = emailUser.current as HTMLInputElement;
        const inputPassword = passwordUser.current as HTMLInputElement;

        if (!checkFormErrors(inputEmail, inputPassword, inputName)) {
            sumbitButton.current?.setAttribute("disable", "false");
            return;
        }

        const { id, errorText } = await createUser({
            name: inputName.value,
            email: inputEmail.value,
            password: inputPassword.value,
        });

        if (errorText) {
            sumbitButton.current?.setAttribute("disable", "false");
            setErrorSubmint(errorText);
            return;
        }

        const { token, errorLoginText } = await logInUser({
            email: inputEmail.value,
            password: inputPassword.value,
        });

        if (errorLoginText) {
            sumbitButton.current?.setAttribute("disable", "false");
            setErrorSubmint(errorLoginText);
            return;
        }

        changeUserInfo(
            id,
            inputName.value,
            token,
            true
        );

        setErrorSubmint("");
        sumbitButton.current?.setAttribute("disable", "false");
    };

    return (
        <SectionContent nameClass="authorization__section">
            <h1 className="title">Регистрация</h1>

            <form className="form" onSubmit={submitFunction}>
                <label>
                    <input
                        ref={nameUser}
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                    />
                    {errorName ? (
                        <p className="error__text">{errorName}</p>
                    ) : null}
                </label>

                <label>
                    <input
                        ref={emailUser}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                    {errorEmail ? (
                        <p className="error__text">{errorEmail}</p>
                    ) : null}
                </label>

                <label>
                    <input
                        ref={passwordUser}
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />

                    {errorPassword ? (
                        <p className="error__text">{errorPassword}</p>
                    ) : null}
                </label>

                <input
                    ref={sumbitButton}
                    type="submit"
                    value={submitRegistrText}
                />
                {errorSubmint ? (
                    <p className="error__text">{errorSubmint}</p>
                ) : null}
            </form>

            <FormInfo
                text={AuthFormText.text}
                pageLink={PageLinks.loginPage}
                textPageLink={AuthFormText.linkText}
            />
        </SectionContent>
    );
};

export default AuthContent;
