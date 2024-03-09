import likeIcon from "./../../assets/icons/like.svg";
import likeIconFilled from "./../../assets/icons/like-filled.svg";
import heartIcon from "./../../assets/icons/heart.svg";
import heartIconFilled from "./../../assets/icons/heart-filled.svg";
import commentIcon from "./../../assets/icons/comment.svg";
import useAuthContext from "../../hooks/useAuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxios from "./../../hooks/useAxios";
import useBlog from "./../../hooks/useBlog";
import { actions } from "../../actions";

export default function BlogActions() {
  const { isAuthenticated, auth } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { api } = useAxios();
  const { id } = useParams();
  const { state, dispatch } = useBlog();
  const { singleBlog } = state;

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: location.pathname });
    } else {
      try {
        const res = await api.post(`/blogs/${id}/like`);
        if (res.status === 200) {
          dispatch({ type: actions.blog.BLOG_LIKED, data: res?.data?.likes });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleFavourite = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: location.pathname });
    } else {
      try {
        const res = await api.patch(`/blogs/${id}/favourite`);
        if (res.status === 200) {
          dispatch({ type: actions.blog.DATA_SINGLE_FETCHED, data: res?.data });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleGoToComment = (event) => {
    if (!isAuthenticated) {
      event.preventDefault();
      navigate("/login", { state: location.pathname });
    }
  };

  const isMeLiked = () => {
    const likes = singleBlog?.likes;
    return likes?.some((like) => like?.id === auth?.user?.id);
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li onClick={handleLike}>
          <img src={isMeLiked() ? likeIconFilled : likeIcon} alt="like" />
          <span>{singleBlog?.likes?.length}</span>
        </li>
        <li onClick={handleFavourite}>
          {/* There is heart-filled.svg in the icons folder */}
          <img
            src={singleBlog?.isFavourite ? heartIconFilled : heartIcon}
            alt="Favourite"
          />
        </li>
        <a onClick={handleGoToComment} href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>{singleBlog?.comments?.length ?? 0}</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
