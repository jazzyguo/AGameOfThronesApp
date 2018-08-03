// action types
const GET_BOOKS = 'GET_BOOKS';
const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
const GET_BOOKS_FAILURE = 'GET_BOOKS_FAILURE';

const initState = {
  books: null,
  fetching: false,
  error: null
};

export default function bookReducer(state = initState, action) {
  let newState;
  switch (action.type) {

    case GET_BOOKS:
    	newState = Object.assign({}, state, {
        fetching: true,
        error: null
      });
    	break;
    
    case GET_BOOKS_SUCCESS:
      newState = Object.assign({}, state, {
        fetching: false,
        books: action.books
      });
      break;

    case GET_BOOKS_FAILURE:
      newState = Object.assign({}, state, {
        fetching: false,
        books: null,
        error: action.error
      });
      break;

    default:
      newState = state;
  }
  return newState;
}

