import { TSimpleActionFC, TSimpleFunction, TSimpleTypeFunction } from "./common";
import { IUserWordsInformation } from "./redux";

export type TChangeNumber = (id: number) => void;
export type TSoundButtonClick = (audio: string) => void;
export type TSoundPlay = (audio: boolean) => void;


export interface IBookPageProps {
    vocabularyCategory: number;
    vocabularyPage: number;
}

export interface IWordItemObj {
    id: string;
    group: number,
    page: number,
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

export interface IWordItemProps extends IWordItemObj {
    authorization: boolean;

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

export interface IWordsListProps {
    bookListInfoArr: Array<IWordItemObj>;
}
