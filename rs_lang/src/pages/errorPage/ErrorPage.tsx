import React from "react";
import { Link } from "react-router-dom";
import SectionContent from "../../components/section";
import { PageLinks } from "../../helpers/consts";
import "./index.scss";

const ErrorPage = () => {
    return (
        <SectionContent nameClass="error__section">
            <h1 className="error__title">404</h1>

            <p className="error__text">
                К сожалению данной страницы не существует!
            </p>

            <Link className="button" to={PageLinks.mainPage}>
                <span>На главную</span>
            </Link>
        </SectionContent>
    );
};

export default ErrorPage;
