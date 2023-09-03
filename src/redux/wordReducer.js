const initialState = {
    wordHistory:[],
}

const wordReducer = (state =initialState,action) => {
    switch(action.type)
    {
        case 'ADDWORD' : return{
            ...state,
            wordHistory:[...state.wordHistory,action.payload],
        }

        default : return state;
    }
}
export default wordReducer;