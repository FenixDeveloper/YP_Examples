//чтобы не было ошибок в кейсах пишем константы,
//если ошибемся в константе это виднее и легче дебажить
import {
	FORM_SET_DATA,
	FORM_SENDING,
	FORM_SUBMITED,
	FORM_FAILED
} from "../actions/form";

//пространство имен (или как еще говорят домен) удобно держать в константе
export const NAMESPACE = 'form';

const initialState = {
	data: {
		firstName: "",
		lastName: "",
		age: "",
		city: "",
		company: "",
		size: "",
		position: "",
		hobby: "",
		films: "",
		music: ""
	},
	submitState: 'editing',
	submitResult: null,
	submitError: null
};

//функция должна быть чистой, иначе весь смысл теряется
export function formReducer(state = initialState, action) {
	switch (action.type) {
		//если что-то меняется, состояние пересобираем
		case FORM_SET_DATA:
			return {
				...state,
				data: {
					...state.data,
					...action.payload
				}
			};
		case FORM_SENDING:
			return {
				...state,
				submitState: 'sending',
				submitResult: null,
				submitError: null
			};
		case FORM_SUBMITED:
			return {
				...state,
				submitState: 'submited',
				submitResult: action.payload,
				submitError: null
			};
		case FORM_FAILED:
			return {
				...state,
				submitState: 'failed',
				submitResult: null,
				submitError: action.payload
			};
		default:
			//если ничего не поменялось, возвращаем полученное состояние!
			return state;
	}
}

export const selectFormData = state => state[NAMESPACE].data;

//вообще внутри селектора можно выполнять любые преобразования 
//для удобства работы с данными
//одни и те же данные можно вернуть в разных видах
//для разных пользователей (компонент)
//лучше избегать возврата лишних данных
export const selectFormState = state => ({
	isLoading: state[NAMESPACE].submitState === 'sending',
	result: state[NAMESPACE].submitResult,
	error: state[NAMESPACE].submitError 
});