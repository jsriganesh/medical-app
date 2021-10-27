import {ActionTypes} from '../action/actionList'


const intialState = {
    validateQuestion:{},
}

export function selectedValidationQuestion (state =  intialState,action) {
    switch(action.type) {
        case ActionTypes.SELECTED_VALIDATION_QUESTION :
            return {...state,validateQuestion:action.payload};
        default:
            return state;
    }
}