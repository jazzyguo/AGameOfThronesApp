import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import App from './components/App/App';
import {createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import bookReducer from './reducers/bookReducer';
import houseReducer from './reducers/houseReducer';
import swornMembersReducer from './reducers/swornMembersReducer';
import modalReducer from './reducers/modalReducer';
import rootSaga from './sagas/sagas';

const _reducers = combineReducers({
	books: bookReducer,
  houses: houseReducer,
  members: swornMembersReducer,
  modal: modalReducer,
  form: formReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
	_reducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)  
  )
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

