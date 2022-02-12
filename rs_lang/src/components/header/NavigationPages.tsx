import React from "react";
import { NavLink } from "react-router-dom";
import { INavigationPages, TSimpleFunction } from "../../types/common";
import { PageLinks } from "../../helpers/consts";

import "./index.scss";
import { IState } from "../../types/redux";
import { connect } from "react-redux";


const NavigationPages = ({ navClassShow, clickMenu, authorization, vocabularyCategory, vocabularyPage, }: INavigationPages) => {
    const HeaderLinks = [
        { link: PageLinks.mainPage, textLink: "Главная" },
        { link: PageLinks.gamesPage, textLink: "Игры" },
        { link: `${PageLinks.bookPage}${vocabularyCategory+1}/${vocabularyPage+1}`, textLink: "Словарь" },
        { link: PageLinks.statisticPage, textLink: "Статистика" },
    ];

    const navClazzName = navClassShow ? "header__nav active__nav" : "header__nav";
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
                    <NavLink className={ loginClazzName} to={PageLinks.loginPage}>Войти</NavLink>
                </li>
            </ul>
        </nav>
    );
};



const mapStateToProps = ( {user: { authorization }, vocabulary: {vocabularyCategory, vocabularyPage}}: IState) => ({
    authorization,vocabularyCategory, vocabularyPage,
});


export default connect(mapStateToProps)(NavigationPages);
