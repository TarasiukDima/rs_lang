import React, { useState } from "react";
import GameStatistic from "../../components/gameStatistic";
import TabList from "../../components/tabList";
import { statisticTabsInfo } from "../../helpers/settings";
import { TTabClickFC } from "../../types/common";
import { IDayStatistic, IGameDayStatistic } from "../../types/statistic";

const StatisticContent = () => {
    const [activeTab, setActiveTab] = useState(1);

    const dayStatistic: IDayStatistic = {
        countsWords: 15,
        answersPersent: 89,
    };

    const gameDayStatistic: IGameDayStatistic = {
        countsWords: 10,
        answersPersent: 90,
        bestSeries: 8,
    };

    const tabClick: TTabClickFC = (id: number) => {
        setActiveTab(() => id);
    };

    return (
        <div className="statistic__content">
            <TabList
                tabsInfo={statisticTabsInfo}
                tabClick={tabClick}
                activeTab={activeTab}
            />

            <div className="game__statistic_wrap">
                <GameStatistic
                    blockTitle={statisticTabsInfo[activeTab - 1].text}
                >
                    <li className="statistic__list_item">
                        Количество изученных слов:{" "}
                        <span>{gameDayStatistic.countsWords}</span>.
                    </li>
                    <li className="statistic__list_item">
                        Процент правильных ответов:{" "}
                        <span>{gameDayStatistic.answersPersent}%</span>.
                    </li>
                    <li className="statistic__list_item">
                        Лучшая серия: <span>{gameDayStatistic.bestSeries}</span>
                        .
                    </li>
                </GameStatistic>

                <GameStatistic blockTitle="Статистика за день">
                    <li className="statistic__list_item">
                        Общее количество изученных слов за день:{" "}
                        <span>{dayStatistic.countsWords}</span>.
                    </li>
                    <li className="statistic__list_item">
                        Процент правильных ответов за день:{" "}
                        <span>{dayStatistic.answersPersent}%</span>.
                    </li>
                </GameStatistic>
            </div>
        </div>
    );
};

export default StatisticContent;
