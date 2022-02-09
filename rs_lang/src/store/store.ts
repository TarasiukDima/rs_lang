import { combineReducers, createStore } from 'redux';
import reducerAudio from './reducers/reducerAudio';
import reducerUser from './reducers/reducerUser';
import reducerVocabulary from './reducers/reducerVocabulary';

export const rootReducer = combineReducers({
    user: reducerUser,
    audio: reducerAudio,
    vocabulary: reducerVocabulary,
})

const store = createStore(rootReducer);

export default store;
