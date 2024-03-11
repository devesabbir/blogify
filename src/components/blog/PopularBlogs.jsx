import { useCallback, useEffect } from "react";
import useBlog from "../../hooks/useBlog";
import { api } from "../../api";
import { actions } from "../../actions";
import { Link } from "react-router-dom";

export default function PopularBlogs() {
  const { state, dispatch } = useBlog();
  const { popularBlogs } = state;

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
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>
      <ul className="space-y-5 my-5">
        {popularBlogs?.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blog/${blog.id}`}>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                {blog?.title}
              </h3>
            </Link>

            <p className="text-slate-600 text-sm">
              by
              <Link to={`/profile/${blog?.author?.id}`}>
                {blog?.author?.firstName} {blog?.author?.lastName}
              </Link>
              <span>·</span>
              {blog?.likes.length} {blog?.likes.length > 1 ? "Likes" : "Like"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
