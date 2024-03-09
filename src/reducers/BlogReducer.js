import { actions } from "../actions";

export const initialState = {
  loading: false,
  error: null,
  blogs: [],
  singleBlog: {},
  popularBlogs: [],
};

export const BlogReducer = (state, action) => {
  switch (action.type) {
    case actions.blog.DATA_FETCHING:
      return {
        ...state,
        loading: true,
      };

    case actions.blog.DATA_FETCHED:
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, ...action.data],
      };

    case actions.blog.DATA_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actions.blog.DATA_SINGLE_FETCHED:
      return {
        ...state,
        loading: false,
        singleBlog: { ...state.singleBlog, ...action.data },
      };

    case actions.blog.BLOG_LIKED:
      return {
        ...state,
        loading: false,
        singleBlog: {
          ...state.singleBlog,
          likes: [...action.data],
        },
      };

    case actions.blog.DATA_POPULAR_FETCHED:
      return {
        ...state,
        loading: false,
        popularBlogs: [...action.data],
      };

    default:
      return state;
  }
};
