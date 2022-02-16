import { combineReducers, createStore, StoreEnhancer } from "redux";

import reducerAudio from "./reducers/reducerAudio";
import reducerUser from "./reducers/reducerUser";
import reducerPages from "./reducers/reducerPages";

export const rootReducer = combineReducers({
    user: reducerUser,
    audio: reducerAudio,
    pages: reducerPages,
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
