import { combineReducers } from "redux";
import {
	formReducer,
	NAMESPACE as FORM_REDUCER_NAMESPACE
} from "./form";
import {
	masterReducer,
	NAMESPACE as MASTER_REDUCER_NAMESPACE
} from "./master";

export default combineReducers({
	[FORM_REDUCER_NAMESPACE]: formReducer,
	[MASTER_REDUCER_NAMESPACE]: masterReducer
});