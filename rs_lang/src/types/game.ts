import { IWordItemObj } from "./book";

export interface IGameOptions {
    gameImg: string;
    pageLink: string;
    linkName: string;
}

export interface ISprintContentProps {
    data: Array<IWordItemObj>;
}

