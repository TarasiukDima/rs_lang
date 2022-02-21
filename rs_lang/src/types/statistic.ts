import ServiceApi from "../services/services";
import { TSimpleTypeFunction } from "./common";
import { IStatisticGameState } from "./redux";

export interface IDayStatistic {
    countsWords: number;
    answersPersent: number;
}

export interface IGameDayStatistic extends IDayStatistic {
    bestSeries: number;
}

export interface IStatisticPageProps {
    authorization: boolean;
}

export interface IGameStatisticProps {
    blockTitle: string | number;
    itemsInfoArray: Array<IGameStatisticBlockObjInfo>,
    nameClass?: string;
}

export interface IStatisticContentProps {
    statisticTab: number;
    changeTab: TSimpleTypeFunction<number>;
    serviceApi: ServiceApi;
}

export interface IStatisticBlocksInfoData extends IStatisticGameState {
    id: string;
}

export interface IStatisticBlocksInfoProps {
    data: IStatisticBlocksInfoData;
    activeTab: number;
}
export interface ISTATDiagrammProps {
    data: ISTATViewObjAllDays;
}

export interface IGameStatisticBlockObjInfo {
    id: number;
    text: string;
    value: number | string | undefined;
}

export interface ISTATDiagrammPartObj {
    newCountsWords: number;
    countsWords: number;
    currentAnswersPersent: number;
    bestSeries: number;
    points?: number;
}

export interface ISTATOneInAllDay {
    learnedWords: number;
    countNewWords: number;
}

export interface ISTATViewObjAllDays {
    [key: string]: ISTATOneInAllDay
}

export interface IStatisticInformation {
    day: ISTATDiagrammPartObj;
    audio: ISTATDiagrammPartObj;
    sprint: ISTATDiagrammPartObj;
    allDays: ISTATViewObjAllDays;
}
