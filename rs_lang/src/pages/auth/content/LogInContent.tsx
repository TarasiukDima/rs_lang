import React, { RefObject, useRef, useState } from "react";
import FormInfo from "../../../components/formInfo";
import SectionContent from "../../../components/section";
import {
    LoginFormText,
    PageLinks,
    submitLoginText,
} from "../../../helpers/consts";
import { validateForm } from "../../../helpers/utils";
import { logInUser } from "../../../services/services";
import { ILogUserProps, TFormSubmitFC } from "../../../types/form";

const LogInContent = ({
    changeUserAuthorization,
    changeUserToken,
    changeUserId,
    changeUserName,
}: ILogUserProps) => {
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorSubmint, setErrorSubmint] = useState("");

    const emailUser = useRef() as RefObject<HTMLInputElement>;
    const passwordUser = useRef() as RefObject<HTMLInputElement>;
    const sumbitButton = useRef() as RefObject<HTMLInputElement>;


    const checkFormErrors = (
        inputEmail: HTMLInputElement,
        inputPassword: HTMLInputElement,
    ) => {
        const {
            email: errEmailText,
            password: errPasswordText,
        } = validateForm(inputEmail, inputPassword);

        errEmailText ? setErrorEmail(errEmailText) : setErrorEmail("");

        errPasswordText
            ? setErrorPassword(errPasswordText)
            : setErrorPassword("");

        if (errEmailText || errPasswordText) {
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

        const inputEmail = emailUser.current as HTMLInputElement;
        const inputPassword = passwordUser.current as HTMLInputElement;

        if (!checkFormErrors(inputEmail, inputPassword)) {
            sumbitButton.current?.setAttribute("disable", "false");
            return;
        }
        const {  errorLoginText, token, userId: id, name } = await logInUser({
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
            name,
            token,
            true
        );

        setErrorSubmint("");
        sumbitButton.current?.setAttribute("disable", "false");
    };

    return (
        <SectionContent nameClass="authorization__section">
            <h1 className="title">Войти</h1>

            <form className="form" onSubmit={submitFunction}>
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
                    value={submitLoginText}
                />
                {errorSubmint ? (
                    <p className="error__text">{errorSubmint}</p>
                ) : null}
            </form>

            <FormInfo
                text={LoginFormText.text}
                pageLink={PageLinks.authPage}
                textPageLink={LoginFormText.linkText}
            />
        </SectionContent>
    );
};

export default LogInContent;
