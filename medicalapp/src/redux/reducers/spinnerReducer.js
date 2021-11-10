import {ActionTypes} from '../action/actionList'


const intialState = {
    spinnerFlag:false,
}

export function spinnerReducer (state =  intialState,action) {
    switch(action.type) {
        case ActionTypes.SPINNER_FLAG :
            return {...state,spinnerFlag:action.payload};
        default:
            return state;
    }
}