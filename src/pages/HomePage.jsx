import { useEffect, useRef, useState } from "react";
import BlogCard from "../components/blog/BlogCard";
import Layout from "../components/common/Layout";
import SideBar from "../components/common/SideBar";
import axios from "axios";
import loaderImage from "./../assets/loader2.gif";

const blogsPerPage = 5;

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchBlogs = async (page) => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=${page}&limit=${
        page * blogsPerPage
      }`
    );

    const data = res.data;

    if (data?.blogs?.length === 0) {
      setHasMore(false);
    } else {
      // eslint-disable-next-line no-unsafe-optional-chaining
      setBlogs((prev) => [...prev, ...data?.blogs]);
      setPage((prev) => prev + 1);
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
  }, [hasMore, page]);

  return (
    <Layout>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {/* Blog Contents */}
            <div className="space-y-3 md:col-span-5">
              {blogs?.map((item) => (
                <BlogCard key={item.id} blog={item} />
              ))}

              {hasMore && (
                <div
                  ref={loaderRef}
                  className="flex items-center justify-center"
                >
                  <img src={loaderImage} alt="loader" />
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
