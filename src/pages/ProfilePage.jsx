import { useParams } from "react-router-dom/dist";
import Layout from "../components/common/Layout";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";
import { api } from "../api";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";
import editIcon from "./../assets/icons/edit.svg";
import BlogCard from "../components/blog/BlogCard";

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

  return (
    <Layout className={"mx-auto max-w-[1020px] py-8"}>
      <div className="container">
        {/* profile info */}
        <div className="flex flex-col items-center py-8 text-center">
          {/* profile image */}
          <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
              {/* User's first name initial */}
              {userData?.avatar ? (
                <img
                  className=" rounded-full"
                  src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                  }/uploads/avatar/${userData?.avatar}`}
                  alt={userData?.firstName}
                />
              ) : (
                <span className="">
                  {userData?.firstName && userData?.firstName[0]}
                </span>
              )}
            </div>

            {isMe && (
              <button className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80">
                <img src={editIcon} alt="Edit" />
              </button>
            )}
          </div>
          {/* name , email */}
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {userData?.firstName} {userData?.lastName}
            </h3>
            <p className="leading-[231%] lg:text-lg">{userData?.email}</p>
          </div>
          {/* bio */}
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
                {userData?.bio}
              </p>
            </div>
            {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
            {isMe && (
              <button className="flex-center h-7 w-7 rounded-full">
                <img src={editIcon} alt="Edit" />
              </button>
            )}
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
        </div>
        {/* end profile info */}
        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        <div className="my-6 space-y-4">
          {/* Blog Card Start */}
          {blogs?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}

          {/* Blog Card End */}
        </div>
      </div>
    </Layout>
  );
}
