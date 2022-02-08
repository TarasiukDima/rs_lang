import { URL_DATA } from "../helpers/settings";

export default class ServiceApi {
    // , params: {} = {}
    private getData = async (stingSearch: string) => {
        return await fetch(URL_DATA + stingSearch)
                        .then((response) => response.json());
    };

    public getWords = async (group: number, page: number) => {
        return await this.getData(`words?group=${group}&page=${page}`)
            .catch((error) => console.error(error, "ошибка при загрузке списка слов"));
    };
}
