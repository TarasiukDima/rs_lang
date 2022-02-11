import React from "react";
import { Link } from "react-router-dom";
import { INavigationPages, TSimpleFunction } from "../../types/common";
import { HeaderLinks, PageLinks } from "../../helpers/consts";

import "./index.scss";
import { IState } from "../../types/redux";
import { connect } from "react-redux";


const NavigationPages = ({ navClassShow, clickMenu, authorization }: INavigationPages) => {
    const navClazzName = navClassShow ? "header__nav active__nav" : "header__nav";
    const loginClazzName = authorization ? "active" : "";

    return (
        <nav className={navClazzName} onClick={clickMenu}>
            <ul className="nav__list">
                {HeaderLinks.map((pageObj) => (
                    <li key={pageObj.textLink} className="nav__list_item">
                        <Link to={pageObj.link}>{pageObj.textLink}</Link>
                    </li>
                ))}

                <li className="nav__list_item">
                    <Link className={ loginClazzName} to={PageLinks.loginPage}>Войти</Link>
                </li>
            </ul>
        </nav>
    );
};



const mapStateToProps = ( {user: { authorization }}: IState) => ({
    authorization
});


export default connect(mapStateToProps)(NavigationPages);
