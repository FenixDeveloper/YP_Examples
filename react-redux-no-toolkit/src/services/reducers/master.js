import {
	MASTER_SET_STEP
} from "../actions/master";

export const NAMESPACE = 'master';

const initialState = {
	current: 0
};

export function masterReducer(state = initialState, action) {
	switch (action.type) {
		case MASTER_SET_STEP:
			return { 
				...state, 
				current: action.payload 
			};
		default:
			return state;
	}
}

export const selectCurrentStep = state => state[NAMESPACE].current;