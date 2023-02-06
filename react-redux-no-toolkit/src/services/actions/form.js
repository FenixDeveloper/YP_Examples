//начинать работу над глобальным хранилищем стоит с экшенов
export const FORM_SET_DATA = 'form/set_data';
export const setFormData = data => ({
	type: FORM_SET_DATA,
	payload: data
});

export const FORM_SENDING = 'form/sending';
export const FORM_SUBMITED = 'form/submited';
export const FORM_FAILED = 'form/failed';

//здесь задействован посредник thunk, благодаря ему мы получаем dispatch
//обратите внимание что это функция возвращаемая из функции!
export const submitForm = api => dispatch => {
	dispatch({ type: FORM_SENDING });
	api() //нам не обязательно знать что там происходит
		.then(result => {
			if (!result || result.error) {
				throw new Error(result.error ?? 'EMPTY_RESULT');
			}

			dispatch({ type: FORM_SUBMITED, payload: result });
		})
		.catch(error => {
			dispatch({ type: FORM_FAILED, payload: error });
		})
};