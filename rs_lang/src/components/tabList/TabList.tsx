import React from "react";
import { ITabInfoObj, ITabsListProps } from "../../types/common";
import TabItem from "./TabItem";
import "./index.scss";

const TabList = ({ tabsInfo, tabClick, activeTab }: ITabsListProps) => {
    return (
        <>
            <ul className="tab__list">
                {tabsInfo.map((tabInfoEl: ITabInfoObj) => {
                    const buttonClassName =
                        activeTab === tabInfoEl.id
                            ? "active"
                            : "";

                    return (
                        <TabItem
                            onclick={tabClick}
                            id={tabInfoEl.id}
                            nameClass={buttonClassName}
                            key={tabInfoEl.id}
                        >
                            {tabInfoEl.id.toString()}
                        </TabItem>
                    );
                })}
            </ul>
        </>
    );
};

export default TabList;
