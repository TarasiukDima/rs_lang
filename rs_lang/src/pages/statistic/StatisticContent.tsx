import React, { Dispatch, useState } from "react";
import { connect } from "react-redux";
import GameStatistic from "../../components/gameStatistic";
import TabList from "../../components/tabList";
import { LOCASTORAGE__STATISTIC_PAG, PageLinks } from "../../helpers/consts";
import { statisticTabsInfo } from "../../helpers/settings";
import { changeStatisticTab } from "../../store/actions/actionsPages";
import { IAction, IState } from "../../types/redux";
import {
    IDayStatistic,
    IGameDayStatistic,
    IStatisticContentProps,
} from "../../types/statistic";

const StatisticContent = ({
    statisticTab,
    changeTab,
}: IStatisticContentProps) => {
    const dayStatistic: IDayStatistic = {
        countsWords: 15,
        answersPersent: 89,
    };

    const gameDayStatistic: IGameDayStatistic = {
        countsWords: 10,
        answersPersent: 90,
        bestSeries: 8,
    };

    const changeHiddenCategoryLink = (id: number) => {
        changeTab(id);
        localStorage.setItem(LOCASTORAGE__STATISTIC_PAG, id.toString());
    };

    return (
        <div className="statistic__content">
            <TabList
                fildCheckActive={statisticTab}
                listItems={statisticTabsInfo}
                tabClick={changeHiddenCategoryLink}
            />

            <div className="game__statistic_wrap">
                <GameStatistic
                    blockTitle={statisticTabsInfo[statisticTab].text}
                >
                    <li className="statistic__list_item">
                        Количество изученных слов:{" "}
                        <span>{gameDayStatistic.countsWords}</span>
                    </li>
                    <li className="statistic__list_item">
                        Процент правильных ответов:{" "}
                        <span>{gameDayStatistic.answersPersent}%</span>
                    </li>
                    <li className="statistic__list_item">
                        Лучшая серия:{" "}
                        <span>{gameDayStatistic.bestSeries}</span>
                    </li>
                </GameStatistic>

                <GameStatistic blockTitle="Статистика за день">
                    <li className="statistic__list_item">
                        Общее количество изученных слов за день:{" "}
                        <span>{dayStatistic.countsWords}</span>
                    </li>
                    <li className="statistic__list_item">
                        Процент правильных ответов за день:{" "}
                        <span>{dayStatistic.answersPersent}%</span>
                    </li>
                </GameStatistic>
            </div>
        </div>
    );
};

const mapStateToProps = ({ pages: { statisticTab } }: IState) => ({
    statisticTab,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    return {
        changeTab: (id: number) => {
            dispatch(changeStatisticTab(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticContent);
