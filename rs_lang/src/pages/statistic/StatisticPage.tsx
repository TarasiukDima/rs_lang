import React from "react";
import { connect } from "react-redux";
import SectionContent from "../../components/section";
import Loader from "../../components/loader";
import FormInfo from "../../components/formInfo";
import StatisticContent from "./StatisticContent";
import { AuthFormText, PageLinks } from "../../helpers/consts";
import { IState } from "../../types/redux";
import { IStatisticPageProps } from "../../types/statistic";

import "./index.scss";

const StatisticPage = ({ authorization }: IStatisticPageProps) => {
    const loading = false;

    if (!authorization) {
        return (
            <SectionContent nameClass="statistic__section">
                <h1 className="title">
                    Для просмотра статистики авторизируйтесь
                </h1>

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

            {loading ? <Loader /> : <StatisticContent />}
        </SectionContent>
    );
};

const mapStateToProps = ({ user: { authorization } }: IState) => ({
    authorization,
});

export default connect(mapStateToProps)(StatisticPage);
