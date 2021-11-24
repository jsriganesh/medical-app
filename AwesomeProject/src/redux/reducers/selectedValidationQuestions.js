import { ActionTypes } from '../action/actionList'


const intialState = {
    validateQuestion: {},
    isGenderQuestion: ""
}

export function selectedValidationQuestion(state = intialState, action) {
    switch (action.type) {
        case ActionTypes.SELECTED_VALIDATION_QUESTION:
            return { ...state, validateQuestion: action.payload };
        case ActionTypes.SELECTED_GENDER:
            return { ...state, isGenderQuestion: action.payload };
        default:
            return state;
    }
}