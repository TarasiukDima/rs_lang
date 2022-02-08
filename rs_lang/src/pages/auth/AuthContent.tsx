import React from "react";
import FormApp from "../../components/form";
import FormInfo from "../../components/formInfo";
import SectionContent from "../../components/section";
import { AuthFormText, PageLinks, rgistrFieldsForm, submitRegistrText } from "../../helpers/settings";
import { TFormSubmitFC } from "../../types/form";



const AuthContent = () => {
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
                fieldsForm={rgistrFieldsForm}
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
