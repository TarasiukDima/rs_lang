import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import SectionContent from "../../../components/section";
import ButtonEl from "../../../components/button";
import topImg from "../../../assets/img/topImg.png";
import {
    mainTitleText1,
    mainTitleText2,
    PageLinks,
} from "../../../helpers/consts";

const TopSection = () => {
    const navigation: NavigateFunction = useNavigate();

    const registrationPageShow = (): void => {
        navigation(PageLinks.authPage);
    };

    return (
        <SectionContent nameClass="top__display">
            <div className="top__img" data-text1="learning" data-text2="goal">
                <img src={topImg} alt="онлайн обучение" />
            </div>

            <div
                className="content__wrap"
                data-text1="knowledge"
                data-text2="teaching"
            >
                <h1 className="main__title">
                    <span data-text={mainTitleText1}>{mainTitleText1}</span>
                    <span data-text={mainTitleText2}>{mainTitleText2}</span>
                </h1>

                <ButtonEl onclick={registrationPageShow}>Регистрация</ButtonEl>
            </div>
        </SectionContent>
    );
};

export default TopSection;
