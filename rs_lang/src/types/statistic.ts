// export type TSoundButtonClick = (audio1: string, audio2: string, audio3: string) => void;


export interface IGameStatisticProps {
    blockTitle: string | number;
    children: JSX.Element | Array<JSX.Element> | string;
    nameClass?: string;
}

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
