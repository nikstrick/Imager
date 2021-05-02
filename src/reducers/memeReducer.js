import{GET_MEMES,GET_MEME,ADD_MEME,UPDATE_MEME} from '../actions/types.js';

//Initializing React states
const initialState={
    memes:[],
    search:{},
}

//Reducer function to implement the changes in front-end using redux state and actions
export default function memeReducer(state=initialState,action){
    switch(action.type){
        case GET_MEMES:{
            return {
                ...state,
                memes:action.payload,
            }
        }
        case GET_MEME:{
            // console.log(action.payload)
            return {
                ...state,
                search:action.payload
            }
        }
        case ADD_MEME:
            return{
                ...state,
                memes:[action.payload,...state.memes]
            }
        case UPDATE_MEME:
            // const x=state.memes.findIndex(meme=>meme.id===action.payload.id)
            return{
                ...state,
                // memes[x]:action.payload,
                search:action.payload
            }
        default:
            return state
    }
}