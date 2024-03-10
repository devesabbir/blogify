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
    case actions.blog.BLOG_DELETED:
      return {
        ...state,
        userData: {
          ...state.userData,
          blogs: state?.userData?.blogs?.filter(
            (item) => item.id !== action.id
          ),
        },
      };
    default:
      return state;
  }
};

export { initialState, profileReducer };
