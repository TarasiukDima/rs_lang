import { TSoundPlay } from "./book";
import { ILocalStoragUser } from "./form";
import { IAction } from "./redux";

export type TSimpleFunction = () => void;
export type TSimpleActionFC<T> = (el: T) => IAction;
export type TSimpleTypeFunction<T> = (el: T) => void;

export type TCheckValue = (
    value: number,
    comparisonValue: number,
    varient: "more" | "less"
) => boolean;
export type TCheckInputValue = (
    val: string,
    RegEx: RegExp
) => RegExpMatchArray | null;
export type TValidateString = (name: string) => string | null;
export type TCheckFormErrors = (
    textEmail: string,
    cbEmail: (st: string) => void,
    textPassword: string,
    cbPassword: (st: string) => void,
    textName?: string,
    cbName?: (st: string) => void
) => boolean;
export type TSaveLocalSettings = (
    name: string,
    infoObj: ILocalStoragUser
) => void;

export type TValidateLocalObj = (
    obj: object,
    arrayKeys: Array<string>
) => boolean;
export type TCheckLocalObj = (
    name: string,
    arrayKeys: Array<string>
) => null | ILocalStoragUser;

export interface SectionProps {
    nameClass: string;
    children?: JSX.Element | Array<JSX.Element> | string | null;
}

export interface PeopleCardProps {
    name: string;
    activity: string;
    githubLink: string;
    imgLink: string;
}

export interface ButtonProps {
    children: JSX.Element | Array<JSX.Element> | string;
    nameClass?: string;
    onclick?: TSimpleFunction;
}

export interface INavigationPages {
    navClassShow: boolean;
    clickMenu: TSimpleFunction;
    authorization: boolean;
    vocabularyCategory: number;
    vocabularyHiddenTab: number;
    vocabularyPage: number;
    statisticTab: number;
}

/* tabs end */
export type TTabClickFC = (id: number) => void;

export interface ITabInfoObj {
    id: number;
    text: string | number;
    link: string;
}

export interface ITabsListProps {
    listItems: Array<ITabInfoObj>;
    fildCheckActive: number;
    tabClick: TTabClickFC;
    children?: JSX.Element | Array<JSX.Element> | null;
}

export interface ITabItem {
    pageNumber: number;
    fildCheckActive: number;
    pageLink: string;
    clickFunction: TTabClickFC;
    textLink?: string | number;
}

export interface IAudioProps {
    audioSrc: string;
    playAudio: boolean;
    changeCategory: TSoundPlay;
}
/* tabs start */
