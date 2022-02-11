import { TCheckValue } from "../types/common";
import { ERROR_VALIDATE_DOMAIN, ERROR_VALIDATE_DOMAIN1_LETTER, ERROR_VALIDATE_DOMAIN2_LETTER, ERROR_VALIDATE_DOMAIN_DOG, ERROR_VALIDATE_DOMAIN_DOT, ERROR_VALIDATE_EMAIL_LENGTH, ERROR_VALIDATE_LENGTH_NAME, ERROR_VALIDATE_LENGTH_PASSWORD, ERROR_VALIDATE_LETTERS, LENGTH_DOMAIN1, MAX_LENGTH_MAILNAME, MAX_LENGTH_NAME, MAX_LENGTH_PASSWORD, MIN_LENGTH_MAILNAME, MIN_LENGTH_NAME, MIN_LENGTH_PASSWORD } from "./consts";

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

const _checkInputValue = (val: string, RegEx: RegExp) => {
    return val.match(RegEx);
};

export const validateName = (name: HTMLInputElement): string | null => {
    const inputValue = name.value.trim();
    const RegEx = /[^а-яА-ЯЁё-іa-zA-Z\s]+/gm;
    const failInput = _checkInputValue(inputValue, RegEx);

    if (failInput) return ERROR_VALIDATE_LETTERS;

    if (
        inputValue &&
        (inputValue.length < MIN_LENGTH_NAME ||
            inputValue.length > MAX_LENGTH_NAME)
    ) {
        return ERROR_VALIDATE_LENGTH_NAME;
    }

    return null;
};

export const validatePassword = (password: HTMLInputElement): string | null => {
    const inputValue = password.value.trim();

    if (
        inputValue && (
            inputValue.length < MIN_LENGTH_PASSWORD
            || inputValue.length > MAX_LENGTH_PASSWORD
        )
    ) {
        return ERROR_VALIDATE_LENGTH_PASSWORD;
    }

    return null;
};

export const validateEmail = (name: HTMLInputElement): string | null => {
    const inputValue = name.value.trim();
    const RegEx = /[\w\d\_\-]{3,16}@[a-z]{4,}\.[a-z]{2,}/gm;
    const RegExDontLetter = /[^\-\_][\W\s]/gm;
    const failInput = _checkInputValue(inputValue, RegEx);

    if (inputValue) {
        const arrInp = inputValue.split("@");
        // name length
        if (arrInp[0].length > MAX_LENGTH_MAILNAME || arrInp[0].length < MIN_LENGTH_MAILNAME) return ERROR_VALIDATE_EMAIL_LENGTH;

        // only letter and numbers and - _
        if (_checkInputValue(arrInp[0], RegExDontLetter)) return ERROR_VALIDATE_DOMAIN;

        // don't @
        if (arrInp.length < 2) return ERROR_VALIDATE_DOMAIN_DOG;

        const arrDomain = arrInp[1].split(".");
        // dot
        if (arrDomain.length < 2) return ERROR_VALIDATE_DOMAIN_DOT;

        // 2 domain length
        if (arrDomain[0].length < LENGTH_DOMAIN1) return ERROR_VALIDATE_DOMAIN1_LETTER;

        // 2 domain length
        if (arrDomain[1].length < 2) return ERROR_VALIDATE_DOMAIN2_LETTER;

        // don't letter and numbers and - _
        if (!failInput || failInput[0] !== inputValue) return ERROR_VALIDATE_LETTERS;
    }

    return null;
};

export const validateForm = (
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    inputName?: HTMLInputElement
) => {
    const results = {
        name: "",
        email: "",
        password: "",
    };

    const validEmail = validateEmail(emailInput);
    const validPassword = validatePassword(passwordInput);

    validEmail ? (results.email = validEmail) : null;

    validPassword ? (results.password = validPassword) : null;

    if (inputName) {
        const validName = validateName(inputName);
        validName ? (results.name = validName) : null;
    }

    return results;
};
