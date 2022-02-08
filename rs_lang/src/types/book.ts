export type TChangeNumber = (id: number) => void;
export type TSoundButtonClick = (audio: string) => void;
export type TSoundPlay = (audio: boolean) => void;


export interface IBookPageProps {
    vocabularyCategory: number;
    vocabularyPage: number;
    changeCategory: TChangeNumber;
    changePage: TChangeNumber;
    changeSrcSong: TSoundButtonClick;
    changePlay: TSoundPlay;
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
    clickButton: TSoundButtonClick;
}

export interface IWordsListProps {
    bookListInfoArr: Array<IWordItemObj>;
    clickButton: TSoundButtonClick;
    key?: number | string;
}
