export type TSoundButtonClick = (audio1: string, audio2: string, audio3: string) => void;


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
