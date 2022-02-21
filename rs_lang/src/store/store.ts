import { combineReducers, createStore, StoreEnhancer } from "redux";

import reducerAudio from "./reducers/reducerAudio";
import reducerGame from "./reducers/reducerGame";
import reducerUser from "./reducers/reducerUser";
import reducerPages from "./reducers/reducerPages";
import reducerStatistic from "./reducers/reducerStatistic";

export const rootReducer = combineReducers({
    user: reducerUser,
    game: reducerGame,
    audio: reducerAudio,
    pages: reducerPages,
    statistic: reducerStatistic,
});

type WindowWithDevTools = Window & {
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>;
};
const isReduxDevtoolsExtenstionExist = (
    arg: Window | WindowWithDevTools
): arg is WindowWithDevTools => {
    return "__REDUX_DEVTOOLS_EXTENSION__" in arg;
};

const store = createStore(
    rootReducer,
    {},
    isReduxDevtoolsExtenstionExist(window)
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : undefined
);

export default store;
