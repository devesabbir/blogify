/* eslint-disable no-unused-vars */
import { useState } from "react";
import CommentIcon from "../../assets/icons/comment.svg";
import LikeIcon from "../../assets/icons/like.svg";
import LikeFilledIcon from "../../assets/icons/like-filled.svg";
import ShareIcon from "../../assets/icons/share.svg";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

export default function PostActions({ post, commentCount }) {
  const { auth } = useAuth();
  const [like, setLike] = useState(post?.likes?.includes(auth?.user?.id));
  const { api } = useAxios();

  const handleLike = async () => {
    try {
      const res = await api.patch(`/posts/${post?.id}/like`);
      if (res.status === 200) {
        setLike(!like);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
      <button
        onClick={handleLike}
        className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
      >
        <img src={like ? LikeFilledIcon : LikeIcon} alt="Like" />
        <span>Like</span>
      </button>

      <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
        <img src={CommentIcon} alt="Comment" />
        <span>Comment({commentCount ?? 0})</span>
      </button>

      <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
        <img src={ShareIcon} alt="Share" />
        <span>Share</span>
      </button>
    </div>
  );
}
