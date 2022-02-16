import { TSimpleTypeFunction } from "./common";

export interface IPaginationItemProps {
    vocabularyPage: number;
    numberPage: number;
    vocabularyCategory: number;
    textPage: string | number;
    changePage: TSimpleTypeFunction<number>;
}

export interface IPaginationPageProps {
    activePage: number;
    countPages: number;
}
