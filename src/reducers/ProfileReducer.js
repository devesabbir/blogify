import { actions } from "../actions";

const initialState = {
  error: null,
  loading: false,
  userData: {},
  favourites: [],
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.profile.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        userData: action.data,
      };
    case actions.profile.DATA_FETCHED_FAVOURITE:
      return {
        ...state,
        favourites: [...action.data],
      };
    default:
      return state;
  }
};

export { initialState, profileReducer };
