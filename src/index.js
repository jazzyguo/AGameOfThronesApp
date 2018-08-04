import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './components/App/App';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import bookReducer from './reducers/bookReducer';
import houseReducer from './reducers/houseReducer';
import modalReducer from './reducers/modalReducer';
import rootSaga from './sagas/sagas';

const _reducers = combineReducers({
	books: bookReducer,
  houses: houseReducer,
  modal: modalReducer,
  form: formReducer
});

const sagaMiddleware = createSagaMiddleware();

const reduxDevTools = 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
	_reducers,
	compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <BrowserRouter>
    	<Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

