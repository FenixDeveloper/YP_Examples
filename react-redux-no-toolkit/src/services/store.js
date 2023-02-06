import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers'

//подключаем Redux Dev Tools
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//пример посредника для перехвата экшенов
const loggerMiddleware = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
}

const round = number => Math.round(number * 100) / 100;
//пример посредника для перехвата редюсеров
const monitorReducerEnhancer = createStore => (reducer, initialState, enhancer) => {
	const monitoredReducer = (state, action) => {
	  const start = performance.now();
	  const newState = reducer(state, action);
	  const end = performance.now();
	  const diff = round(end - start);

	  //можно сделать сохраняемое состояние
	  //localStorage.setItem(LS_STATE_KEY, JSON.stringify(newState));

	  console.log('reducer process time:', diff);

	  return newState
	};

	return createStore(monitoredReducer, initialState, enhancer)
}

//пример функции для получения сохраненного состояния 
//из локального хранилища
const LS_STATE_KEY = '__store_state';
export const getPreloadedState = (() => {
	try {
		const state = localStorage.getItem(LS_STATE_KEY);
		return state ? JSON.parse(state) : undefined;
	} catch (err) {
		return undefined;
	}
});

//лучше всего возвращать отсюда функцию
//для корректной работы hot reload и удобства инициализации
export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
  const composedEnhancers = composeEnhancers(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}