import { useEffect, useRef, useState } from "react";
import BlogCard from "../components/blog/BlogCard";
import Layout from "../components/common/Layout";
import SideBar from "../components/common/SideBar";
import axios from "axios";
import useBlog from "../hooks/useBlog";
import { actions } from "./../actions/index";
import loaderImg from "./../assets/loader.gif";
import useToast from "../hooks/useToast";

const blogsPerPage = 10;

export default function HomePage() {
  const { state, dispatch } = useBlog();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { toastInfo } = useToast();
  const loaderRef = useRef(null);

  const fetchBlogs = async (page) => {
    dispatch({ type: actions.blog.DATA_FETCHING });
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/blogs?page=${page}&limit=${blogsPerPage}`
      );

      const data = res?.data || [];

      if (data?.blogs?.length === 0) {
        setHasMore(false);
        toastInfo("No more blogs in the API", { position: "bottom-center" });
      } else {
        dispatch({ type: actions.blog.DATA_FETCHED, data: data?.blogs });
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      dispatch({ type: actions.blog.DATA_FETCH_ERROR, error: error.message });
    }
  };

  useEffect(() => {
    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchBlogs(page);
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, page]);

  return (
    <Layout>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {/* Blog Contents */}

            <div className="space-y-3 md:col-span-5">
              {state?.blogs?.map((item) => (
                <BlogCard key={item?.id || 1} blog={item} />
              ))}

              {hasMore && (
                <div
                  ref={loaderRef}
                  className="flex items-center justify-center"
                >
                  <img className="w-14" src={loaderImg} alt="loader" />
                </div>
              )}
            </div>
            {/* Sidebar */}
            <SideBar />
          </div>
        </div>
      </section>
    </Layout>
  );
}
