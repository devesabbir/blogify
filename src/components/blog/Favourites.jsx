import { useCallback, useEffect } from "react";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";
import FavouriteItem from "./FavouriteItem";

export default function Favourites() {
  const { state, dispatch } = useProfile();
  const { favourites } = state;
  const { api } = useAxios();

  const fetchFavourites = useCallback(async () => {
    try {
      const res = await api.get(`/blogs/favourites`);
      if (res.status === 200) {
        dispatch({
          type: actions.profile.DATA_FETCHED_FAVOURITE,
          data: res?.data?.blogs,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [api, dispatch]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      fetchFavourites();
    }

    return () => {
      ignore = true;
    };
  }, [fetchFavourites]);

  let favouritesBlogs = null;

  if (favourites.length === 0) {
    favouritesBlogs = (
      <li className=" text-gray-400">
        There are no blogs in your favorites list
      </li>
    );
  }

  if (favourites.length > 0) {
    favouritesBlogs = favourites?.map((item) => (
      <FavouriteItem key={item.id} item={item} />
    ));
  }

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>
      <ul className="space-y-5 my-5">{favouritesBlogs}</ul>
    </div>
  );
}
