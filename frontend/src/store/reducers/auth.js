import * as actionType from "../actionType/index";

const INIT_INITIAL_STATE = {
  loggedIn: false, 
  userData: null,
  loginUserFailure: null, 
  registerUserFailure: null, 
};

const reducerFn = (state= INIT_INITIAL_STATE, action) => {
  switch(action.type) {
    case actionType.LOGIN_USER_FAILURE: 
      return Object.assign({}, INIT_INITIAL_STATE, { 
        loggedIn: false,
        loginUserFailure: action.payload.data,
      });
    case actionType.LOGIN_USER_SUCCESS: 
      return Object.assign({}, INIT_INITIAL_STATE, { 
        loggedIn: true,
        userData: action.payload,
      });
    case actionType.REGISTER_USER_FAILURE: 
      return Object.assign({}, INIT_INITIAL_STATE, {
        registerUserFailure: action.payload.data,
      });
    case actionType.REGISTER_USER_SUCCESS: 
      return Object.assign({}, INIT_INITIAL_STATE, { 
        loggedIn: true,
        userData: action.payload,
      });
    case actionType.UPDATE_USER_LOGGEDIN: 
      return Object.assign({}, state, { loggedIn: true });
    default:
      return state;
  }
}

export default reducerFn;