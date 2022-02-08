import { TCheckValue } from "../types/common";

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
