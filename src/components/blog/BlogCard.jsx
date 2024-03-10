import editIcon from "./../../assets/icons/edit.svg";
import deleteIcon from "./../../assets/icons/delete.svg";
import threeDotsIcon from "./../../assets/icons/3dots.svg";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import formatDate from "../../utils/formateDate";
import { useAvatar } from "../../hooks/useAvatar";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import useBlog from "../../hooks/useBlog";
import { actions } from "../../actions";
import useProfile from "../../hooks/useProfile";
import { toast } from "react-toastify";

export default function BlogCard({ blog }) {
  const { auth } = useAuthContext();
  const { id, title, content, thumbnail, author, likes, createdAt } = blog;
  const { avatarUrl, firstLetter } = useAvatar(author);
  const [editMode, setEditMode] = useState(false);
  const isMe = auth?.user?.id === author?.id;
  const { api } = useAxios();
  const { dispatch } = useBlog();
  const { dispatch: profileDispatch } = useProfile();

  const handleDeleteBlog = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await api.delete(`/blogs/${id}`);

        if (res.status === 200) {
          dispatch({ type: actions.blog.BLOG_DELETED, id: id });
          profileDispatch({ type: actions.blog.BLOG_DELETED, id: id });
          setEditMode(false);
          toast.info(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="blog-card">
      <img
        className="blog-thumb"
        src={`${
          import.meta.env.VITE_SERVER_BASE_URL
        }/uploads/blog/${thumbnail}`}
        alt="thumbnail"
      />
      <div className="mt-2 relative">
        <Link to={`/blog/${id}`}></Link>
        <h3 className="text-slate-300 text-xl lg:text-2xl">
          <Link to={`/blog/${id}`}></Link>
          <Link to={`/blog/${id}`}>{title}</Link>
        </h3>
        <p className="mb-6 text-base text-slate-500 mt-1">{content}</p>
        {/* Meta Informations */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              {author?.avatar ? (
                <img
                  className="w-10 h-10 rounded-full"
                  src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                  }/uploads/avatar/${isMe ? auth?.user?.avatar : avatarUrl}`}
                  alt={author?.firstName}
                />
              ) : (
                <span className="">{firstLetter}</span>
              )}
            </div>
            <div>
              <h5 className="text-slate-500 text-sm">
                <Link to={`/profile/${author?.id}`}>
                  {author?.firstName} {author?.lastName}
                </Link>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="text-sm px-2 py-1 text-slate-700">
            <span>
              {likes?.length} {likes?.length > 1 ? "Likes" : "Like"}
            </span>
          </div>
        </div>
        {/* action dot */}
        {auth?.user?.id === author?.id && (
          <div className="absolute right-0 top-0">
            <button onClick={() => setEditMode(!editMode)}>
              <img src={threeDotsIcon} alt="3dots of Action" />
            </button>
            {/* Action Menus Popup */}
            {editMode && (
              <div className="action-modal-container">
                <button className="action-menu-item hover:text-lwsGreen">
                  <img src={editIcon} alt="Edit" />
                  Edit
                </button>
                <button
                  onClick={handleDeleteBlog}
                  className="action-menu-item hover:text-red-500"
                >
                  <img src={deleteIcon} alt="Delete" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}

        {/* action dot ends */}
      </div>
    </div>
  );
}
