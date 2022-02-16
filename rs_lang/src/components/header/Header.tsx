import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import NavigationPages from "./NavigationPages";
import { PageLinks } from "../../helpers/consts";
import { TSimpleFunction } from "../../types/common";

import "./index.scss";

const Header: FC = () => {
    const [navClassShow, setNavClassShow] = useState(false);

    const changeShowMenu: TSimpleFunction = () => {
        setNavClassShow(() => !navClassShow);
    };

    const clickMenu: TSimpleFunction = () => {
        setNavClassShow(() => false);
    };

    const burgetClasses = navClassShow ? "burger active__burger" : "burger";

    return (
        <header className="header">
            <div className="wrapper">
                <Link className="header__logo" to={PageLinks.mainPage}>
                    RS Lang
                </Link>

                <button
                    className={burgetClasses}
                    onClick={() => changeShowMenu()}
                >
                    <span></span>
                </button>

                <NavigationPages
                    navClassShow={navClassShow}
                    clickMenu={clickMenu}
                />
            </div>
        </header>
    );
};

export default Header;
