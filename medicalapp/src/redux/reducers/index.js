import {combineReducers} from "redux";

// import {footerReducer} from "../reducers/footerReducer"
// import {userDetailsReducer} from "../reducers/userDetailsReducer"
import {selectedValidationQuestion} from "../reducers/selectedValidationQuestions";
import {backNavigationListReducer} from "../reducers/backNavigationList"
import {spinnerReducer} from "../reducers/spinnerReducer"

export default combineReducers({
    selectedValidationQuestion,
    backNavigationListReducer,
    spinnerReducer
})