import { TSoundPlay } from "./book";

export type TSimpleFunction = () => void;

export type TCheckValue = (
    value: number,
    comparisonValue: number,
    varient: "more" | "less"
) => boolean;



/* tabs start */
export type TTabClickFC = (id: number) => void;

export interface ITabInfoObj {
    id: number;
    text: string | number;
}

export interface ITabsListProps {
    tabsInfo: Array<ITabInfoObj>;
    tabClick: TTabClickFC;
    activeTab: number;
}

export interface ITabsItemProps {
    children: JSX.Element | Array<JSX.Element> | string;
    key: string | number;
    onclick: TTabClickFC;
    id: number;
    nameClass?: string;
}
/* tabs end */


export interface IAudioProps {
    audioSrc: string;
    playAudio: boolean;
    changeCategory: TSoundPlay;
}
