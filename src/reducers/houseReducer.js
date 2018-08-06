// get a page of houses
const GET_HOUSES = 'GET_HOUSES';
const GET_HOUSES_SUCCESS = 'GET_HOUSES_SUCCESS';
const GET_HOUSES_FAILURE = 'GET_HOUSES_FAILURE';
// get a specific house
const GET_HOUSE = 'GET_HOUSE';
const GET_HOUSE_SUCCESS = 'GET_HOUSE_SUCCESS';
const GET_HOUSE_FAILURE = 'GET_HOUSE_FAILURE';

const initState = {
  houses: null,
  selectedHouse: null,
  selectedHouseLoading: false,
  selectedHouseError: null,
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
        error: action.e
      });
      break;

    case GET_HOUSE:
      newState = Object.assign({}, state, {
        selectedHouseLoading: true,
        selectedHouseError: null
      });
      break;
    
    case GET_HOUSE_SUCCESS:
      newState = Object.assign({}, state, {
        selectedHouseLoading: false,
        selectedHouse: action.house
      });
      break;

    case GET_HOUSE_FAILURE:
      newState = Object.assign({}, state, {
        selectedHouseLoading: false,
        selectedHouse: null,
        selectedHouseError: action.e
      });
      break;

    default:
      newState = state;
  }
  return newState;
}