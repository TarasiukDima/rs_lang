import { LOCASTORAGE__NAME_USER, URL_DATA } from "../helpers/consts";
import { USER_LOCAL_KEYS } from "../helpers/settings";
import { checkSettingsLocalStorage } from "../helpers/utils";
import {
    ApiUrls,
    ErrorMessages,
    IApiOptions,
    IApiUserInfo,
    IApiWordsObj,
    ICreateUserWord,
    IHeaders,
    ISettingsData,
    IStatisticData,
    IUserCreateForm,
    IUserLogInForm,
    TOptionsMethods,
} from "../types/api";
import { ILocalStoragUser } from "../types/form";

class ServiceApi {
    time: number;
    token: string;
    refreshToken: string;
    idUser: string;
    difficult: "normal";

    constructor() {
        this.time = 0;
        this.token = "";
        this.refreshToken = "";
        this.idUser = "";
        this.difficult = "normal";
    }

    init = () => {
        this.checkLocalStorage();
    };

    private changeUserInfo = ({
        token,
        userId,
        refreshToken,
        time,
    }: IApiUserInfo) => {
        const date = new Date().getTime();
        console.log(date);

        this.time = time ? date : 0;
        this.token = token;
        this.refreshToken = refreshToken;
        this.idUser = userId;
    };

    private changeOptions = (
        method: TOptionsMethods,
        body: string
    ): IApiOptions => {
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

        if (this.token) {
            options.withCredentials = true;
            (options.headers as IHeaders)[
                "Authorization"
            ] = `Bearer ${this.token}`;
        }
        return options;
    };

    private checkLocalStorage = () => {
        const answer = checkSettingsLocalStorage(
            LOCASTORAGE__NAME_USER,
            USER_LOCAL_KEYS
        ) as ILocalStoragUser;
        console.log(answer);

        if (answer) {
            this.time = answer.time || 0;
            this.token = answer.token;
            this.refreshToken = answer.refreshToken;
            this.idUser = answer.id;
        }
    };

    private getData = async (
        stingSearch: string,
        method: TOptionsMethods = "GET",
        body: string | "" = ""
    ) => {
        const url = URL_DATA + stingSearch;
        const options = this.changeOptions(method, body);

        return await fetch(url, options).then((response) => {
            if (!response.ok) {
                throw new Error(`Bad url:${url}`);
            }
            return response.json();
        });
    };

    /* user start */
    public createUser = async (user: IUserCreateForm) => {
        const data = JSON.stringify(user);
        return await this.getData(ApiUrls.createUser, "POST", data)
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

    public getToken = async () => {
        const urlString = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.tokens}`;
        return await this.getData(urlString).catch((error) =>
            console.error(error, ErrorMessages.getToken)
        );
    };

    public logInUser = async (user: IUserLogInForm) => {
        const data = JSON.stringify(user);

        return await this.getData(ApiUrls.signInUser, "POST", data)
            .then((data) => {
                this.changeUserInfo({
                    token: data.token,
                    userId: data.userId,
                    refreshToken: data.refreshToken,
                    time: true,
                });

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

    public logOut = () => {
        this.changeUserInfo({
            token: "",
            userId: "",
            refreshToken: "",
            time: false,
        });
    };
    /* user end */

    /* words start */
    public getWords = async (
        group: number,
        page: number
    ): Promise<IApiWordsObj> => {
        const urlString = `${ApiUrls.words}?group=${group}&page=${page}`;

        return await this.getData(urlString)
            .then((words) => {
                return {
                    words: words,
                    errorWordsText: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { errorWordsText: ErrorMessages.getWords, words: [] };
            });
    };
    /* words end */

    /* user words start */
    public getUserAllWords = async () => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.words}`;
        return await this.getData(url, "GET", "")
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

    public createUserWord = async ({
        wordId,
        wordOptions,
    }: ICreateUserWord) => {
        const options = {
            difficulty: this.difficult,
            optional: wordOptions,
        };
        return await this.getData(
            `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.words}/${wordId}`,
            "POST",
            JSON.stringify(options)
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

    public updateUserWord = async ({
        wordId,
        wordOptions,
    }: ICreateUserWord) => {
        const options = {
            difficulty: this.difficult,
            optional: wordOptions,
        };

        return await this.getData(
            `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.words}/${wordId}`,
            "PUT",
            JSON.stringify(options)
        )
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

    public deleteUserWord = async (wordId: string) => {
        return await this.getData(
            `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.words}/${wordId}`,
            "DELETE",
            ""
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

    public getUserWord = async (wordId: string) => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.words}/${wordId}`;
        return await this.getData(url, "GET", "")
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
    public getUserAggregatedWords = async () => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.aggregatedWords}`;
        return await this.getData(url, "GET", "")
            .then((data) => {
                return {
                    ...data,
                    errorUserWords: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return {
                    errorUserWords: ErrorMessages.getUserAggregatedWords,
                };
            });
    };
    /* user agregates end */

    /* user statistic start */
    public getUseStatistics = async () => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.statistics}`;
        return await this.getData(url, "GET", "")
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

    public ulpdateUseStatistics = async (optionsUpdate: IStatisticData) => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.statistics}`;
        return await this.getData(url, "PUT", JSON.stringify(optionsUpdate))
            .then((data) => {
                return {
                    ...data,
                    errorUserWords: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return {
                    errorUserWords: ErrorMessages.ulpdateUseStatistics,
                };
            });
    };
    /* user statistic end */

    /* user settings start */
    public getUseSettings = async () => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.settings}`;
        return await this.getData(url, "GET", "")
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

    public updateUseSettings = async (optionsUpdate: ISettingsData) => {
        const url = `${ApiUrls.createUser}/${this.idUser}/${ApiUrls.settings}`;
        return await this.getData(url, "PUT", JSON.stringify(optionsUpdate))
            .then((data) => {
                return {
                    ...data,
                    errorUserWords: null,
                };
            })
            .catch((error) => {
                console.error(error);
                return { errorUserWords: ErrorMessages.updateUseSettings };
            });
    };
    /* user settings end */
}

export default ServiceApi;
