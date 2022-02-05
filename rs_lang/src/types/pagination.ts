import { TTabClickFC } from "./common";

export interface IPaginationPageProps {
    activePage: number;
    clickButton: TTabClickFC;
    countPages: number;
}

export interface IPaginationItemProps {
    numberPage: number;
    textPage: string | number;
    clickButton: TTabClickFC;
    active?: boolean;
}
