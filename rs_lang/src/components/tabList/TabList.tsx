import React from "react";
import TabItem from "./TabItem";
import { ITabsListProps } from "../../types/common";

import "./index.scss";

const TabList = ({
    listItems,
    fildCheckActive,
    tabClick,
    children,
}: ITabsListProps) => {
    return (
        <nav className="categories__nav">
            <ul className="categories__list">
                {listItems.map((item) => (
                    <TabItem
                        key={item.link}
                        pageNumber={item.id}
                        pageLink={item.link}
                        clickFunction={tabClick}
                        textLink={item.text}
                        fildCheckActive={fildCheckActive}
                    />
                ))}
                {children}
            </ul>
        </nav>
    );
};

export default TabList;
