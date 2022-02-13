import { URL_DATA } from "../helpers/consts";
import {
    ApiUrls,
    ErrorMessages,
    IApiOptions,
    IHeaders,
    IUserCreateForm,
    IUserLogInForm,
    TOptionsMethods,
} from "../types/api";

const _getData = async (
    stingSearch: string,
    method: TOptionsMethods = "GET",
    body = "",
    token = ""
) => {
    const url = URL_DATA + stingSearch;
    const options: IApiOptions = {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = body;
    }
    if (token) {
        options.withCredentials = true;
        (options.headers as IHeaders)["Authorization"] = `Bearer ${token}`;
    }

    return await fetch(url, options).then((response) => {
        if (!response.ok) {
            throw new Error(`Bad url:${url}`);
        }
        return response.json();
    });
};

/* words start */
export const getWords = async (group: number, page: number) => {
    const urlString = `${ApiUrls.words}?group=${group}&page=${page}`;

    return await _getData(urlString).catch((error) =>
        console.error(error, ErrorMessages.getWords)
    );
};
/* words end */

/* user start */
export const createUser = async (user: IUserCreateForm) => {
    const data = JSON.stringify(user);
    return await _getData(ApiUrls.createUser, "POST", data)
        .then((data) => {
            return {
                ...data,
                errorText: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { id: null, errorText: ErrorMessages.createUser };
        });
};

export const getToken = async (id: string) => {
    const urlString = `${ApiUrls.createUser}/${id}/tokens`;

    return await _getData(urlString).catch((error) =>
        console.error(error, ErrorMessages.getToken)
    );
};

export const logInUser = async (user: IUserLogInForm) => {
    const data = JSON.stringify(user);

    return await _getData(ApiUrls.signInUser, "POST", data)
        .then((data) => {
            return {
                ...data,
                errorLoginText: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorLoginText: ErrorMessages.authorization };
        });
};
/* user end */

/* user words start */
interface IWordOptionObj {
    learned: boolean;
    difficult: boolean;
}

interface ICreateUserWordObj {
    difficulty: "normal",
    optional: IWordOptionObj
}

interface IUserWordOptionObj {
    userId: string;
    wordId: string;
    token: string;
}

interface ICreateUserWord extends IUserWordOptionObj {
    wordOptions: IWordOptionObj;
}

export const getUserAllWords = async (userId: string, token: string) => {
    const url = `users/${userId}/${ApiUrls.words}`;
    return await _getData(url, "GET", "", token)
        .then((data) => {
            return {
                words: [...data],
                errorUserWords: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorUserWords: ErrorMessages.getUserAllWords };
        });
};

export const createUserWord = async ({
    userId,
    wordId,
    wordOptions,
    token,
}: ICreateUserWord) => {
    const options = {
        difficulty: "normal",
        optional: wordOptions
    }
    return await _getData(
        `users/${userId}/words/${wordId}`,
        "POST",
        JSON.stringify(options),
        token
    )
        .then((data) => {
            return {
                ...data,
                errorUserWords: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorUserWords: ErrorMessages.createUserWord };
        });
};

export const updateUserWord = async ({
    userId,
    wordId,
    wordOptions,
    token,
}: ICreateUserWord) => {
    const options = {
        difficulty: "normal",
        optional: wordOptions
    }

    return await _getData(`users/${userId}/words/${wordId}`, "PUT", JSON.stringify(options), token)
        .then((data) => {
            return {
                ...data,
                errorUserWords: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorUserWords: ErrorMessages.updateUserWord };
        });
};

export const deleteUserWord = async ({
    userId,
    wordId,
    token,
}: IUserWordOptionObj) => {
    return await _getData(
        `users/${userId}/words/${wordId}`,
        "DELETE",
        "",
        token
    )
        .then((data) => {
            return {
                ...data,
                errorUserWords: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorUserWords: ErrorMessages.deleteUserWord };
        });
};

export const getUserWord = async (
    userId: string,
    wordId: string,
    token: string
) => {
    const url = `users/${userId}/${ApiUrls.words}/${wordId}`;
    return await _getData(url, "GET", "", token)
        .then((data) => {
            return {
                ...data,
                errorUserWords: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorUserWords: ErrorMessages.getUserWord };
        });
};
/* user words end */



/* user agregates start */
export const getUserAggregatedWords = async (
    userId: string,
    token: string
) => {
    const url = `users/${userId}/aggregatedWords`;
    return await _getData(url, "GET", "", token)
        .then((data) => {
            return {
                ...data,
                errorUserWords: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorUserWords: ErrorMessages.getUserAggregatedWords };
        });
};
/* user agregates end */

/* user statistic start */
export const getUseStatistics = async (
    userId: string,
    token: string
) => {
    const url = `users/${userId}/statistics`;
    return await _getData(url, "GET", "", token)
        .then((data) => {
            return {
                ...data,
                errorUserWords: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorUserWords: ErrorMessages.getUseStatistics };
        });
};

interface IStatisticData {
    "learnedWords": number,
    "optional": {}
}
export const ulpdateUseStatistics = async (
    userId: string,
    optionsUpdate: IStatisticData,
    token: string
) => {
    const url = `users/${userId}/statistics`;
    return await _getData(url, "PUT", JSON.stringify(optionsUpdate), token)
        .then((data) => {
            return {
                ...data,
                errorUserWords: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorUserWords: ErrorMessages.ulpdateUseStatistics };
        });
};
/* user statistic end */



/* user settings start */
export const getUseSettings = async (
    userId: string,
    token: string
) => {
    const url = `users/${userId}/settings`;
    return await _getData(url, "GET", "", token)
        .then((data) => {
            return {
                ...data,
                errorUserWords: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorUserWords: ErrorMessages.getUseSettings };
        });
};

interface ISettingsData {
    "wordsPerDay": number,
    "optional": {}
  }
export const ulpdateUseSettings = async (
    userId: string,
    optionsUpdate: ISettingsData,
    token: string
) => {
    const url = `users/${userId}/settings`;
    return await _getData(url, "PUT", JSON.stringify(optionsUpdate), token)
        .then((data) => {
            return {
                ...data,
                errorUserWords: null,
            };
        })
        .catch((error) => {
            console.error(error);
            return { errorUserWords: ErrorMessages.ulpdateUseSettings };
        });
};
/* user settings end */
