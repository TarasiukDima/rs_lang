import { TCheckValue } from "./types/common";

export const PREV_PAGINGATION_TEXT = "&#171;";
export const NEXT_PAGINGATION_TEXT = "&#187;";


export enum PageLinks {
    mainPage = "/",
    authPage = "/auth/",
    loginPage = "/log_in/",
    bookPage = "/book/",
    gamesPage = "/games/",
    gameSprintPage = "/games/sprint",
    gameAudioPage = "/games/audio",
    statisticPage = "/statistic/",
}

export const checkValue: TCheckValue = (
    value: number,
    comparisonValue: number,
    varient: "more" | "less" = "more"
): boolean => {
    if (varient === "more") {
        return value >= comparisonValue;
    }

    return value <= comparisonValue;
};
