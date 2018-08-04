// action types
const GET_BOOKS = 'GET_BOOKS';
const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
const GET_BOOKS_FAILURE = 'GET_BOOKS_FAILURE';

const initState = {
  books: null,
  loading: false,
  error: null
};

export default function bookReducer(state = initState, action) {
  let newState;
  switch (action.type) {

    case GET_BOOKS:
    	newState = Object.assign({}, state, {
        loading: true,
        error: null
      });
    	break;
    
    case GET_BOOKS_SUCCESS:
      newState = Object.assign({}, state, {
        loading: false,
        books: action.books
      });
      break;

    case GET_BOOKS_FAILURE:
      newState = Object.assign({}, state, {
        loading: false,
        books: null,
        error: action.error
      });
      break;

    default:
      newState = state;
  }
  return newState;
}