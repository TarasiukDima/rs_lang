import {
    TSimpleActionFC,
    TSimpleFunction,
    TSimpleTypeFunction,
} from "./common";
import ServiceApi from "../services/services";
import { IUserWordsInformation } from "./redux";

export type TSoundButtonClick = (audio: string) => void;
export type TSoundPlay = (audio: boolean) => void;

export interface IWordItemObj {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    textExampleTranslate: string;
    textMeaningTranslate: string;
    wordTranslate: string;
}

export interface IBookContentProps {
    vocabularyCategory: number;
    vocabularyPage: number;
    serviceApi: ServiceApi;
}

export interface IBookPageProps {
    vocabularyCategory: number;
    vocabularyPage: number;
}

export interface IWordsListProps {
    bookListInfoArr: Array<IWordItemObj>;
}

export interface IWordItemProps extends IWordItemObj {
    authorization: boolean;

    serviceApi: ServiceApi;

    token: string;
    userID: string;
    wordsSettings: IUserWordsInformation;

    changeCountLearnedItems: TSimpleTypeFunction<number>;
    setCoutnSecond: TSimpleTypeFunction<boolean>;

    changeSrcSong: TSoundButtonClick;
    changePlay: TSoundPlay;

    addLearned: TSimpleTypeFunction<string>;
    removeLearned: TSimpleTypeFunction<string>;
    addDifficult: TSimpleTypeFunction<string>;
    removeDifficult: TSimpleTypeFunction<string>;

    key?: number | string;
}

export interface CardProps {
    title: string;
    img: string;
    description: string;
    nameClassItem?: string;
    nameClassButton?: string;
    onclick?: TSimpleFunction;
}

export interface IBookCategoriesProps {
    authorization: boolean;
    vocabularyHiddenTab: number;
    vocabularyCategory: number;
    changeCategory: TSimpleTypeFunction<number>;
    changeHiddenCategory: TSimpleTypeFunction<number>;
}

export interface IBookLearnProps {
    authorization: boolean;
    serviceApi: ServiceApi;
}
