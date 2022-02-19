import ServiceApi from "../services/services";
import { TSoundPlay } from "./book";
import { TSimpleTypeFunction } from "./common";

export interface IGameListProps {
    category: number | null;
    page: number | null;
}

export interface IGameProps extends IGameListProps {
    gameImg: string;
    pageLink: string;
    linkName: string;
    changeGameCat: TSimpleTypeFunction<null | number>;
    changeGamePage: TSimpleTypeFunction<null | number>;
}

export interface IGamCategoryPage {
    gameCategory: number | null;
    gamePage: number | null;
}

export interface IOneGameProps extends IGamCategoryPage {
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

export interface ISprintGameProps {
    serviceApi: ServiceApi;
}

export interface IAudioGameProps {
    serviceApi: ServiceApi;
}
