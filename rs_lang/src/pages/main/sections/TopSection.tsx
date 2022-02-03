import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import SectionContent from "../../../components/section";
import ButtonEl from "../../../components/button";
import { PageLinks } from "../../../utils";
import topImg from "../../../assets/img/topImg.png";

const TopSection = () => {
    const navigation: NavigateFunction = useNavigate();
    const mainTitleText1 = "Изучай английский язык ";
    const mainTitleText2 = "быстро и с интересом";

    const registrationPageShow = (): void => {
        navigation(PageLinks.authPage);
    };

    const gamesPageShow = (): void => {
        navigation(PageLinks.gamesPage);
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

                <div className="buttons__wrapper">
                    <ButtonEl onclick={registrationPageShow}>
                        Регистрация
                    </ButtonEl>

                    <ButtonEl onclick={gamesPageShow}>Игры</ButtonEl>
                </div>
            </div>
        </SectionContent>
    );
};

export default TopSection;
