import React, { RefObject, useRef, useState } from "react";
import FormInfo from "../../../components/formInfo";
import LabelForm from "../../../components/label";
import {
    LoginFormText,
    PageLinks,
    submitLoginText,
} from "../../../helpers/consts";
import { checkFormErrors } from "../../../helpers/utils";
import { logInUser } from "../../../services/services";
import { ILogUserProps, TFormSubmitFC } from "../../../types/form";

const LogInContent = ({ changeUser }: ILogUserProps) => {
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
            errorLoginText,
            token,
            userId: id,
            name,
        } = await logInUser({
            email: emailText,
            password: passwordText,
        });

        if (errorLoginText) {
            return stopSubmit(errorLoginText);
        }

        changeUser({
            id: id,
            name: name,
            token: token,
            authorization: true,
        });
        stopSubmit(errorLoginText);
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

export default LogInContent;
