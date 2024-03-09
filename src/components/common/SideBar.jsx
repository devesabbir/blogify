import { useCallback, useEffect } from "react";
import { api } from "../../api";
import useBlog from "../../hooks/useBlog";
import { actions } from "../../actions";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useProfile from "./../../hooks/useProfile";
import { stringToTagFormate } from "../../utils/tagFormate";

export default function SideBar() {
  const { state, dispatch } = useBlog();
  const { state: profileState, dispatch: profileDispatch } = useProfile();
  const { api: authApi } = useAxios();
  const { popularBlogs } = state;
  const { favourites } = profileState;

  const fetchPopularBlogs = useCallback(async () => {
    try {
      const res = await api.get(`/blogs/popular`);
      if (res.status === 200) {
        dispatch({
          type: actions.blog.DATA_POPULAR_FETCHED,
          data: res?.data?.blogs,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const fetchFavourites = useCallback(async () => {
    try {
      const res = await authApi.get(`/blogs/favourites`);
      if (res.status === 200) {
        profileDispatch({
          type: actions.profile.DATA_FETCHED_FAVOURITE,
          data: res?.data?.blogs,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [authApi, profileDispatch]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchFavourites();
    }

    return () => {
      ignore = true;
    };
  }, [fetchFavourites]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchPopularBlogs();
    }

    return () => {
      ignore = true;
    };
  }, [fetchPopularBlogs]);

  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <div className="sidebar-card">
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
          Most Popular 👍️
        </h3>
        <ul className="space-y-5 my-5">
          {popularBlogs?.map((blog) => (
            <li key={blog.id}>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                {blog?.title}
              </h3>
              <p className="text-slate-600 text-sm">
                by
                <Link href={`/profile.html`}>
                  {blog?.author?.firstName} {blog?.author?.lastName}
                </Link>
                <span>·</span>
                {blog?.likes.length} {blog?.likes.length > 1 ? "Likes" : "Like"}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-card">
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
          Your Favourites ❤️
        </h3>
        <ul className="space-y-5 my-5">
          {favourites?.map((item) => (
            <li key={item.id}>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                {item?.title}
              </h3>
              <p className="text-slate-600 text-sm">
                {stringToTagFormate(item?.tags)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
