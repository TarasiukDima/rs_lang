import React from "react";
import SectionContent from "../../components/section";
import Loader from "../../components/loader";
import StatisticContent from "./StatisticContent";
import "./index.scss";
import FormInfo from "../../components/formInfo";
import { AuthFormText, PageLinks } from "../../helpers/settings";

const StatisticPage = () => {
    const loading = false;
    const authorization = false;


    if (!authorization) {
        return (
            <SectionContent nameClass="statistic__section">
                <h1 className="title">Для просмотра статистики авторизируйтесь</h1>

                <FormInfo
                    text={AuthFormText.text}
                    pageLink={PageLinks.loginPage}
                    textPageLink={AuthFormText.linkText}
                />
            </SectionContent>
        );
    }


    return (
        <SectionContent nameClass="statistic__section">
            <h1 className="title">Статистика</h1>

            {
                loading
                    ? <Loader />
                    : <StatisticContent/>
            }
        </SectionContent>
    );
};

export default StatisticPage;
