import React from "react";
import FormApp from "../../components/form";
import FormInfo from "../../components/formInfo";
import SectionContent from "../../components/section";
import { IInputsObjInfo, TFormSubmitFC } from "../../types/form";
import { PageLinks } from "../../utils";
import "./index.scss";

enum LoginFormText {
    text = 'Если у вас нет аккаунта, тогда зарегистрируйтесь',
    linkText = 'Создать аккаунт',
}

const LoginPage = () => {
    const fieldsForm: Array<IInputsObjInfo> = [
        { name: "email", type: "email", placeholder: "Email" },
        { name: "password", type: "password", placeholder: "Password" },
    ];
    const submitRegistrText = "Войти";

    const submitFunction: TFormSubmitFC = (
        event: React.FormEvent<HTMLFormElement>
    ): void => {
        event.preventDefault();
        console.log(event.currentTarget);
    };

    return (
        <SectionContent nameClass="authorization__section">
            <h1 className="title">Войти</h1>

            <FormApp
                submitFunction={submitFunction}
                fieldsForm={fieldsForm}
                submitBtnText={submitRegistrText}
            />

            <FormInfo
                text={LoginFormText.text}
                pageLink={PageLinks.authPage}
                textPageLink={LoginFormText.linkText}
            />
        </SectionContent>
    );
};

export default LoginPage;
