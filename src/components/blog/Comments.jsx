import { useState } from "react";
import Comment from "./Comment";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router-dom";

export default function Comments({ comments }) {
  const [comment, setComment] = useState("");
  const { api } = useAxios();
  const { id } = useParams();

  const handleComment = async () => {
    const res = await api.post(`/blogs/${id}}/comment`, { content: comment });
    console.log(res);
  };
  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments ({comments?.length})
        </h2>
        <div className="flex items -center space-x-4">
          <div className="avater-img bg-indigo-600 text-white">
            <span className="">S</span>
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
        </div>
        {/* Comment  */}

        {comments?.map((item) => (
          <Comment key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
