import { TTabClickFC } from "./common";

export interface IPaginationPageProps {
    activePage: number;
    countPages: number;
}

export interface IPaginationItemProps {
    numberPage: number;
    vocabularyCategory: number;
    textPage: string | number;
    changePage: TTabClickFC;
}
