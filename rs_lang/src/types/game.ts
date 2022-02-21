import ServiceApi from "../services/services";
import { IWordItemObj, TSoundPlay } from "./book";
import { TActionFC, TSimpleFunction, TSimpleTTypesFC, TSimpleTypeFunction } from "./common";
import { IStatisticGameState, IStatisticInfoObjState, IStatisticOptional, IUserWordKeys, IUserWordsInformation } from "./redux";

export type TSoundGameButton  = (audio: string, local: boolean) => void;

export interface IGameListProps {
    gameOnePage: boolean;
    category: number | null;
    page: number | null;
}

export interface IGameProps extends IGameListProps {
    gameImg: string;
    pageLink: string;
    linkName: string;
    gameOnePage: boolean;
    changeGameCat: TSimpleTypeFunction<null | number>;
    changeGamePage: TSimpleTypeFunction<null | number>;
    changeVarientGame: TSimpleTypeFunction<boolean>;
}

export interface IGamCategoryPage {
    gameCategory: number | null;
    gamePage: number | null;
}

export interface IOneGamePageProps extends Pick<IGamCategoryPage, "gameCategory"> {
    changeGameCat: TSimpleTypeFunction<null | number>;
    changeGamePage: TSimpleTypeFunction<null | number>;
}

export interface IChooseProps {
    gameTitle: string;
    changeCateAndPage: TSimpleTypeFunction<number>;
}


export interface IAudioPlayerProps {
    audioSrc: string;
    playAudio: boolean;
    changeCategory: TSoundPlay;
}

export interface IGameBlockProps {
    wordsSettings: IUserWordsInformation;
    gameOnePage: boolean;
    needGame: string;
    serviceApi: ServiceApi;
    gameCategory: number | null;
    gamePage: number | null;
}

export interface IOneGameBodyProps {
    authorization: string;
    token: string;
    id: string;
    learnedWords: number;
    optional:IStatisticOptional;
    serviceApi: ServiceApi;
    data: Array<IWordItemObj>;
    wordsSettings: IUserWordsInformation;
    needGame: string;

    changeSrcSong: TSoundGameButton;
    changePlay: TSimpleTypeFunction<boolean>;

    addWordInfo: TSimpleTTypesFC<string, IUserWordKeys>;
    updateWordGameState: TSimpleTTypesFC<string, Partial<IUserWordKeys>>;

    updateAllStatistic: TSimpleTypeFunction<IStatisticGameState>;
}



export interface IOneGameHeadProps {
    countRightAnswer: number;
    points: number;
    pointsCoefficient: number;
    setTimeOutGame: TSimpleTypeFunction<boolean>;
}


export interface IQuestionProps {
    needGame: string;
    questionInfo: IWordItemObj;
    answersChoices: Array<string>;
    anserQuetsionFunc: TSimpleTypeFunction<boolean>;
}

export interface IAnswerObj {
    id: string;
    audio: string;
    word: string;
    wordTranslate: string;
    answer: boolean;
}

export interface IGameResultProps {
    points: number;
    needGame: string;
    authorization: boolean;
    wrongAnswers: Array<IAnswerObj>;
    currentAnswers: Array<IAnswerObj>;
    restartGame: TSimpleFunction;
    serviceApi: ServiceApi;
    countLearnedWords: number;
    maxLineCurrentAnswers: number;
    playSong: TSoundGameButton;


    learnedWords: number;
    optional:IStatisticOptional;
    updateAllStatistic: TSimpleTypeFunction<IStatisticGameState>;
}
export interface IResultList {
    title: string;
    array: Array<IAnswerObj>;
    playSong: TSoundGameButton;
    classList?: string;
}

export interface ITimerProps {
    timeTimer: number;
    cbEnd: TSimpleTypeFunction<boolean>;
}
