import { URL_DATA } from "../helpers/settings";
import { IWordItemObj } from "../types/book";

type TGetWords = (group: number, page: number) => Promise<Array<IWordItemObj>>;

export interface IServiceApi {
    getWords: TGetWords;
}

class ServiceApi implements IServiceApi {
    // , params: {} = {}
    private getData = async (stingSearch: string) => {
        return await fetch(URL_DATA + stingSearch).then((response) =>
            response.json()
        );
    };

    public getWords = async (group: number, page: number) => {
        return await this.getData(`words?group=${group}&page=${page}`)
            .catch((error) => console.error(error, "ошибка при загрузке списка слов"));
    };
}

// TODO: remove
// Very bad or not?????????????????????????????
export const serviceApi = new ServiceApi();
