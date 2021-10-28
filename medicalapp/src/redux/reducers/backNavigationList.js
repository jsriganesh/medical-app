import {ActionTypes} from '../action/actionList'


const intialState = {
    backNavigationList:[0],
}

export function backNavigationListReducer (state =  intialState,action) {
    switch(action.type) {
        case ActionTypes.BACK_NAVIGATIONS :
            return {...state,backNavigationList:action.payload};
        default:
            return state;
    }
}