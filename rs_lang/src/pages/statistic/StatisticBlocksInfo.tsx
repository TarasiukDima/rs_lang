import React from "react";
import GameStatistic from "../../components/gameStatistic";
import StatisticDiagramm from "./StatisticDiagramm";

import { statisticTabsInfo } from "../../helpers/settings";
import {
    ISTATDiagrammPartObj,
    IStatisticBlocksInfoProps,
    IStatisticInformation,
    ISTATViewObjAllDays,
} from "../../types/statistic";
import { ISTATDayFields, ISTATGameFields, ISTATWords } from "../../types/redux";

const StatisticBlocksInfo = ({
    data,
    activeTab,
}: IStatisticBlocksInfoProps) => {
    const {
        optional: { gameStatistics, wordStatistics },
    } = data;
    const dateObj = new Date();
    const keyWordStatistic = `${dateObj.getFullYear()}, ${dateObj.getMonth()}, ${dateObj.getDate()}`;

    const changeObjFields = (
        obj: ISTATDiagrammPartObj,
        checkObj: ISTATDayFields | ISTATGameFields
    ) => {
        if (checkObj) {
            const {
                learnedWords,
                longestSeries,
                correctAnswers,
                wrongAnswers,
                countNewWords,
            } = checkObj;
            obj.newCountsWords = countNewWords;
            obj.countsWords = learnedWords;
            obj.bestSeries = longestSeries;
            obj.currentAnswersPersent = Math.floor(
                (correctAnswers / (correctAnswers + wrongAnswers)) * 100
            ) || 0;
            if ("points" in obj && "points" in checkObj) {
                obj.points = checkObj.points;
            }
        }
    };

    const addAllDaysStatistic = (
        obj: ISTATViewObjAllDays,
        checkObj: ISTATWords
    ) => {
        const keysArr = Object.keys(checkObj).sort();

        keysArr.forEach((key) => {
            const { learnedWords, countNewWords } = checkObj[key];
            obj[key] = {
                learnedWords: learnedWords,
                countNewWords: countNewWords,
            };
        });
    };

    const createInfoObj = (): IStatisticInformation => {
        const infoObj = {
            day: {
                newCountsWords: 0,
                countsWords: 0,
                currentAnswersPersent: 0,
                bestSeries: 0,
            },
            audio: {
                newCountsWords: 0,
                countsWords: 0,
                currentAnswersPersent: 0,
                bestSeries: 0,
            },
            sprint: {
                newCountsWords: 0,
                countsWords: 0,
                currentAnswersPersent: 0,
                bestSeries: 0,
                points: 0,
            },
            allDays: {},
        };

        changeObjFields(infoObj.day, wordStatistics[keyWordStatistic]);
        changeObjFields(infoObj.audio, gameStatistics.audio);
        changeObjFields(infoObj.sprint, gameStatistics.sprint);
        addAllDaysStatistic(infoObj.allDays, wordStatistics);

        return infoObj;
    };

    const allTabsInfo = createInfoObj();

    const sprintInfo = [
        {
            id: 4137457434545,
            text: "Количество новых слов за день: ",
            value: allTabsInfo.sprint.newCountsWords,
        },
        {
            id: 456345628990085,
            text: "Количество изученных слов за день: ",
            value: allTabsInfo.sprint.countsWords,
        },
        {
            id: 45642345234554,
            text: "Процент правильных ответов за день: ",
            value: allTabsInfo.sprint.currentAnswersPersent + "%",
        },
        {
            id: 5646879684,
            text: "Лучшая серия за день: ",
            value: allTabsInfo.sprint.bestSeries,
        },
        {
            id: 5646875423684,
            text: "Максимальное количество очков: ",
            value: allTabsInfo.sprint.points,
        },
    ];

    const audioInfo = [
        {
            id: 45246265,
            text: "Количество новых слов за день: ",
            value: allTabsInfo.audio.newCountsWords,
        },
        {
            id: 4573685,
            text: "Количество изученных слов за день: ",
            value: allTabsInfo.audio.countsWords,
        },
        {
            id: 456454,
            text: "Процент правильных ответов за день: ",
            value: allTabsInfo.audio.currentAnswersPersent + "%",
        },
        {
            id: 5646879684,
            text: "Лучшая серия за день: ",
            value: allTabsInfo.audio.bestSeries,
        },
    ];

    const dayInfo = [
        {
            id: 123533123123,
            text: "Общее количество новых слов за день: ",
            value: allTabsInfo.day.newCountsWords,
        },
        {
            id: 1235123123,
            text: "Общее количество изученных слов за день: ",
            value: allTabsInfo.day.countsWords,
        },
        {
            id: 128855345,
            text: "Процент правильных ответов за день: ",
            value: allTabsInfo.day.currentAnswersPersent + "%",
        },
        {
            id: 612342134,
            text: "Лучшая серия за день: ",
            value: allTabsInfo.day.bestSeries,
        },
    ];

    return (
        <div className="game__statistic_wrap">
            {activeTab === 0 && (
                <GameStatistic
                    blockTitle={statisticTabsInfo[activeTab].text}
                    itemsInfoArray={audioInfo}
                />
            )}
            {activeTab === 1 && (
                <GameStatistic
                    blockTitle={statisticTabsInfo[activeTab].text}
                    itemsInfoArray={sprintInfo}
                />
            )}
            <GameStatistic
                blockTitle="Статистика за день"
                itemsInfoArray={dayInfo}
            />

            <StatisticDiagramm data={allTabsInfo.allDays} />
        </div>
    );
};

export default StatisticBlocksInfo;
