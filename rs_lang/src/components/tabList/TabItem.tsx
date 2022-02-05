import React from "react";
import { ITabsItemProps } from "../../types/common";
import "./index.scss";

const TabItem = ({
    nameClass = "",
    children,
    onclick,
    id,
}: ITabsItemProps) => {
    const classesText = nameClass ? "tab__button " + nameClass : "tab__button";

    return (
        <li className="tab__item">
            <button className={classesText} onClick={() => onclick(id)}>
                {children}
            </button>
        </li>
    );
};

export default TabItem;
