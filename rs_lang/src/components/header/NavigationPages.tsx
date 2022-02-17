import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { NUMBER_HIDDEN_CATEGORY, PageLinks } from "../../helpers/consts";
import {
    hiddenCategoriesTabsInfo,
    statisticTabsInfo,
} from "../../helpers/settings";
import { INavigationPages } from "../../types/common";
import { IState } from "../../types/redux";

import "./index.scss";

const NavigationPages = ({
    navClassShow,
    clickMenu,
    authorization,
    vocabularyCategory,
    vocabularyPage,
    vocabularyHiddenTab,
    statisticTab,
}: INavigationPages) => {
    // vocabulary
    const vocabularyLink =
        vocabularyCategory === NUMBER_HIDDEN_CATEGORY
            ? hiddenCategoriesTabsInfo[vocabularyHiddenTab].link
            : `${PageLinks.bookPage}${vocabularyCategory + 1}/${
                  vocabularyPage + 1
              }`;

    const HeaderLinks = [
        { link: PageLinks.mainPage, textLink: "Главная" },
        { link: PageLinks.gamesPage, textLink: "Игры" },
        { link: vocabularyLink, textLink: "Словарь" },
        {
            link: statisticTabsInfo[statisticTab].link,
            textLink: "Статистика",
        },
    ];

    const navClazzName = navClassShow
        ? "header__nav active__nav"
        : "header__nav";
    const loginClazzName = authorization ? "authorization" : "";

    return (
        <nav className={navClazzName} onClick={clickMenu}>
            <ul className="nav__list">
                {HeaderLinks.map((pageObj) => (
                    <li key={pageObj.textLink} className="nav__list_item">
                        <NavLink to={pageObj.link}>{pageObj.textLink}</NavLink>
                    </li>
                ))}

                <li className="nav__list_item">
                    <NavLink
                        className={loginClazzName}
                        to={PageLinks.loginPage}
                    >
                        Войти
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

const mapStateToProps = ({
    user: { authorization },
    pages: {
        vocabularyCategory,
        vocabularyPage,
        statisticTab,
        vocabularyHiddenTab,
    },
}: IState) => ({
    authorization,
    vocabularyCategory,
    vocabularyPage,
    vocabularyHiddenTab,
    statisticTab,
});

export default connect(mapStateToProps)(NavigationPages);
