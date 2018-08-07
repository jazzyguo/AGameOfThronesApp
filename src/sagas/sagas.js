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

// FETCH A SINGLE HOUSE 
const selectedHouseSaga = takeLatest('GET_HOUSE', fetchHouse);

function fetchHouseRequest(houseId) {
  return axios({
    method: 'get',
    url: `https://www.anapioficeandfire.com/api/houses/${houseId}`
  });
}

function* fetchHouse(dispatch) {
  try {
    const houseId = dispatch.houseId;
    const response = yield call(fetchHouseRequest, houseId);
    const house = response.data;

    yield put({type: 'GET_HOUSE_SUCCESS', house});
  } catch (e) {
    yield put({type: 'GET_HOUSE_FAILURE', e});
  }
}

// Fetch sworn members
const membersSaga = takeLatest('GET_MEMBERS', fetchMembers);

function* fetchMembers(dispatch) {
  try {
    let members;
    const memberURLArray = dispatch.members;
    const houseId = dispatch.houseId;

    members = yield all(memberURLArray.map(url => {
      return axios.get(url).then(res => res.data)
    }));

    yield put({type: 'GET_MEMBERS_SUCCESS', members, houseId});
  } catch (e) {
    yield put({type: 'GET_MEMBERS_FAILURE', e});
  }
}

/*
 * ROOT SAGA 
 */
export default function* rootSaga() {
	 yield all([
    	bookSaga,
      houseSaga,
      selectedHouseSaga,
      membersSaga
    ])
}