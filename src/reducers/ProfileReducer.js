import { actions } from "../actions";

const initialState = {
  user: null,
  error: null,
  loading: false,
  posts: [],
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
        user: action.data.user,
        posts: action.data.posts,
      };

    case actions.profile.DATA_FETCHED_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actions.profile.USER_DATA_EDITED:
      return {
        ...state,
        loading: false,
        user: action.data,
      };

    case actions.profile.IMAGE_UPDATED:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action?.data?.avatar,
        },
      };
    default:
      return state;
  }
};

export { initialState, profileReducer };
