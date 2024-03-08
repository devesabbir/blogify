import { useState } from "react";
import { createPortal } from "react-dom";
import Comment from "./Comment";
import BlogActions from "./BlogActions";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import useBlog from "../../hooks/useBlog";
import { actions } from "../../actions";

export default function Comments({ comments }) {
  const { isAuthenticated, auth } = useAuthContext();
  const { dispatch } = useBlog();
  const [comment, setComment] = useState("");
  const { api } = useAxios();
  const { id } = useParams();

  const handleComment = async () => {
    try {
      const res = await api.post(`/blogs/${id}/comment`, { content: comment });
      if (res.status === 200) {
        dispatch({ type: actions.blog.DATA_SINGLE_FETCHED, data: res.data });
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const firstLetter = auth?.user?.firstName[0];

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({comments?.length})
        </h2>
        <div className="flex items -center space-x-4">
          {isAuthenticated && (
            <>
              <div className="avater-img bg-indigo-600 text-white">
                {auth?.user?.avatar ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={`${
                      import.meta.env.VITE_SERVER_BASE_URL
                    }/uploads/avatar/${auth?.user?.avatar}`}
                    alt={auth?.user?.firstName}
                  />
                ) : (
                  <span className="">{firstLetter}</span>
                )}
              </div>

              <div className="w-full">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                  placeholder="Write a comment"
                  value={comment}
                />
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleComment}
                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Comment  */}

        {createPortal(<BlogActions />, document.body)}

        {comments?.map((item) => (
          <Comment key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
