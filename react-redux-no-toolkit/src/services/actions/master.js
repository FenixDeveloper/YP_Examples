export const MASTER_SET_STEP = 'master/set_step';
export const setStep = step => ({
	type: MASTER_SET_STEP,
	payload: step
});