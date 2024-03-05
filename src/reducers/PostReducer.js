import { actions } from "../actions";

export const initialState = {
  loading: false,
  error: null,
  posts: [],
};

export const PostReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };
    case actions.post.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        posts: [...state.posts, ...action.data],
      };
    case actions.post.DATA_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
