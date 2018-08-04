// action types
const GET_HOUSES = 'GET_HOUSES';
const GET_HOUSES_SUCCESS = 'GET_HOUSES_SUCCESS';
const GET_HOUSES_FAILURE = 'GET_HOUSES_FAILURE';

const initState = {
  houses: null,
  loading: false,
  error: null,
  page: 1
};

export default function houseReducer(state = initState, action) {
  let newState;
  switch (action.type) {

    case GET_HOUSES:
    	newState = Object.assign({}, state, {
        loading: true,
        error: null
      });
    	break;
    
    case GET_HOUSES_SUCCESS:
      newState = Object.assign({}, state, {
        loading: false,
        houses: action.houses,
        page: action.page
      });
      break;

    case GET_HOUSES_FAILURE:
      newState = Object.assign({}, state, {
        loading: false,
        houses: null,
        error: action.error
      });
      break;

    default:
      newState = state;
  }
  return newState;
}