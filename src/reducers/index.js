import{combineReducers} from 'redux';
import memeReducer from './memeReducer';

export default combineReducers({
    meme:memeReducer
})