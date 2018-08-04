import 'regenerator-runtime/runtime';
import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

const BOOKS_API_URL = 'https://www.anapioficeandfire.com/api/books?pageSize=12';
const HOUSES_API_URL = 'https://www.anapioficeandfire.com/api/houses';

// BOOKS SAGA
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

// HOUSES SAGA
const houseSaga = takeLatest('GET_HOUSES', fetchHouses);

function fetchHousesRequest(page, pageSize) {
    return axios({
      method: 'get',
      url: `${HOUSES_API_URL}?page=${page}&pageSize=${pageSize}`
    });
}

function* fetchHouses(dispatch) {
  try {
    const page = dispatch.page;
    const pageSize = dispatch.pageSize;
    const response = yield call(fetchHousesRequest, page, pageSize);
    const houses = response.data;

    yield put({type: 'GET_HOUSES_SUCCESS', houses, page});
  } catch (e) {
    yield put({type: 'GET_HOUSES_FAILURE', e});
  }
}

/*
 * ROOT SAGA 
 */
export default function* rootSaga() {
	 yield all([
    	bookSaga,
      houseSaga
    ])
}