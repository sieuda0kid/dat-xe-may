import {SAVE_PROFILE} from '../actions/actionType';

const initalState = {
  profile: null,
};

const userReducer = (state = initalState, action) => {
  console.log('action.profile');
  console.log(action.profile);
  switch(action.type) {
    case SAVE_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    default:
      return state;
  }
};

export default userReducer;
