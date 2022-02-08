import React from "react";
import FormApp from "../../components/form";
import FormInfo from "../../components/formInfo";
import SectionContent from "../../components/section";
import { loginFieldsForm, LoginFormText, PageLinks, submitLoginText } from "../../helpers/settings";
import { TFormSubmitFC } from "../../types/form";



const LogInContent = () => {
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
                fieldsForm={loginFieldsForm}
                submitBtnText={submitLoginText}
            />

            <FormInfo
                text={LoginFormText.text}
                pageLink={PageLinks.authPage}
                textPageLink={LoginFormText.linkText}
            />
        </SectionContent>
    );
};

export default LogInContent;
