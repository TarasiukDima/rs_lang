import React from "react";
import { Link } from "react-router-dom";
import { PageLinks } from "../../utils";
import "./index.scss";

import { TSimpleFunction } from "../../types/common";

interface INavigationPages {
    navClassShow: boolean;
    clickMenu: TSimpleFunction;
}

const NavigationPages = ({ navClassShow, clickMenu }: INavigationPages) => {
    const pages = [
        { link: PageLinks.mainPage, textLink: "Главная" },
        { link: PageLinks.gamesPage, textLink: "Игры" },
        { link: PageLinks.bookPage, textLink: "Словарь" },
        { link: PageLinks.statisticPage, textLink: "Статистика" },
        { link: PageLinks.authPage, textLink: "Авторизация" },
    ];

    const navClasses = navClassShow ? "header__nav active__nav" : "header__nav";

    return (
        <nav className={navClasses} onClick={clickMenu}>
            <ul className="nav__list">
                {pages.map((pageObj) => (
                    <li key={pageObj.textLink} className="nav__list_item">
                        <Link to={pageObj.link}>{pageObj.textLink}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavigationPages;
