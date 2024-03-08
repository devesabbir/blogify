import { useEffect } from "react";
import Layout from "../components/common/Layout";
import useAxios from "../hooks/useAxios";

import { Link, useParams } from "react-router-dom";
import formatDate from "../utils/formateDate";
import Comments from "../components/blog/Comments";
import useBlog from "../hooks/useBlog";
import { actions } from "../actions";

export default function SingleBlog() {
  const { api } = useAxios();
  const { id } = useParams();
  const { state, dispatch } = useBlog();
  const { singleBlog } = state;

  useEffect(() => {
    let ignore = false;
    const fetchSingleBlog = async () => {
      const res = await api.get(`/blogs/${id}`);
      if (res.status === 200) {
        dispatch({ type: actions.blog.DATA_SINGLE_FETCHED, data: res.data });
      }
    };

    if (!ignore) {
      fetchSingleBlog();
    }

    return () => {
      ignore = true;
    };
  }, [api, dispatch, id]);

  const firstLetter = singleBlog?.author?.firstName[0];
  const date = formatDate(singleBlog.createdAt);

  return (
    <Layout>
      {/* Begin Blogs */}
      <section>
        <div className="container text-center py-8">
          <h1 className="font-bold text-3xl md:text-5xl">
            {singleBlog?.title}
          </h1>
          <div className="flex justify-center items-center my-4 gap-4">
            <div className="flex items-center capitalize space-x-2">
              <div className="avater-img bg-indigo-600 text-white">
                <span className="">{firstLetter}</span>
              </div>
              <Link to={`/profile/${singleBlog?.author?.id}`}>
                <h5 className="text-slate-500 text-sm">
                  {singleBlog?.author?.firstName} {singleBlog?.author?.lastName}
                </h5>
              </Link>
            </div>
            <span className="text-sm text-slate-700 dot">{date}</span>
            <span className="text-sm text-slate-700 dot">
              {" "}
              {singleBlog?.likes?.length}{" "}
              {singleBlog?.likes?.length > 1 ? "Likes" : "Like"}
            </span>
          </div>
          <img
            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
              singleBlog?.thumbnail
            }`}
            alt="thumbnail"
          />
          {/* Tags */}
          <ul className="tags">
            {singleBlog?.tags?.split(", ")?.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {/* Content */}
          <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
            {singleBlog?.content}
          </div>
        </div>
      </section>
      {/* End Blogs */}
      {/* Begin Comments */}
      <Comments comments={singleBlog?.comments} />
    </Layout>
  );
}
