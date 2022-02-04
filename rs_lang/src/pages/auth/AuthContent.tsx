import React from "react";
import FormApp from "../../components/form";
import FormInfo from "../../components/formInfo";
import SectionContent from "../../components/section";
import { IInputsObjInfo, TFormSubmitFC } from "../../types/form";
import { PageLinks } from "../../utils";

enum AuthFormText {
    text = 'Если у вас есть аккаунт, тогда войдите в него',
    linkText = 'Войти',
}

const AuthContent = () => {
    const fieldsForm: Array<IInputsObjInfo> = [
        { name: "name", type: "text", placeholder: "Name" },
        { name: "email", type: "email", placeholder: "Email" },
        { name: "password", type: "password", placeholder: "Password" },
    ];
    const submitRegistrText = "Зарегистрироваться";

    const submitFunction: TFormSubmitFC = (
        event: React.FormEvent<HTMLFormElement>
    ): void => {
        event.preventDefault();
        console.log(event.currentTarget);
    };

    return (
        <SectionContent nameClass="authorization__section">
            <h1 className="title">Регистрация</h1>

            <FormApp
                submitFunction={submitFunction}
                fieldsForm={fieldsForm}
                submitBtnText={submitRegistrText}
                needFileButton={true}
            />

            <FormInfo
                text={AuthFormText.text}
                pageLink={PageLinks.loginPage}
                textPageLink={AuthFormText.linkText}
            />
        </SectionContent>
    );
};

export default AuthContent;
