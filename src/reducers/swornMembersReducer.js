// action types
const GET_MEMBERS = 'GET_MEMBERS';
const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE';

const initState = {
  members: null,
  loading: false,
  error: null,
  houseId: null
};

export default function swornMembersReducer(state = initState, action) {
  let newState;
  switch (action.type) {

    case GET_MEMBERS:
    	newState = Object.assign({}, state, {
        loading: true,
        error: null
      });
    	break;
    
    case GET_MEMBERS_SUCCESS:
      newState = Object.assign({}, state, {
        loading: false,
        members: action.members,
        houseId: action.houseId
      });
      break;

    case GET_MEMBERS_FAILURE:
      newState = Object.assign({}, state, {
        loading: false,
        books: null,
        error: action.e
      });
      break;

    default:
      newState = state;
  }
  return newState;
}