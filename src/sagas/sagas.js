import 'regenerator-runtime/runtime';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

const BOOKS_API_URL = 'https://www.anapioficeandfire.com/api/books?pageSize=12';

// BOOK SAGA
const bookSaga = takeLatest('GET_BOOKS', fetchBooks);

function fetchBooksRequest() {
	return axios({
		method: 'get',
		url: BOOKS_API_URL
	});
}

function* fetchBooks() {
   try {
      const response = yield call(fetchBooksRequest);
      const books = response.data;

      yield put({type: 'GET_BOOKS_SUCCESS', books});
   } catch (e) {
      yield put({type: 'GET_BOOKS_FAILURE', e});
   }
}

/*
 * ROOT SAGA 
 */
export default function* rootSaga() {
	 yield all([
    	bookSaga
    ])
}