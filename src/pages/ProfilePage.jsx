import { useParams } from "react-router-dom/dist";
import Layout from "../components/common/Layout";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";
import { api } from "../api";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";

import BlogCard from "../components/blog/BlogCard";
import ProfileInfo from "../components/profile/ProfileInfo";

export default function ProfilePage() {
  const { auth } = useAuthContext();
  const { id } = useParams();
  const { state, dispatch } = useProfile();
  const { userData } = state;
  const isMe = userData?.id === auth?.user?.id;
  const blogs = userData?.blogs || [];

  useEffect(() => {
    let ignore = false;
    const fetchSingleProfile = async () => {
      try {
        const res = await api.get(`/profile/${id ?? auth?.user?.id}`);
        if (res.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: res.data });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!ignore) {
      fetchSingleProfile();
    }

    return () => {
      ignore = true;
    };
  }, [auth?.user?.id, dispatch, id]);

  let blogContent = null;

  if (blogs?.length === 0) {
    blogContent = <p className="text-center">You don&apos;t have any blogs</p>;
  }

  if (blogs?.length > 0) {
    blogContent = blogs?.map((blog) => <BlogCard key={blog.id} blog={blog} />);
  }

  return (
    <Layout className={"mx-auto max-w-[1020px] py-8"}>
      <div className="container">
        {/* profile info */}
        <ProfileInfo userData={userData} isMe={isMe} />
        {/* end profile info */}
        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        <div className="my-6 space-y-4">
          {/* Blog Card Start */}
          {blogContent}

          {/* Blog Card End */}
        </div>
      </div>
    </Layout>
  );
}
