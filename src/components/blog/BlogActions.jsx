import likeIcon from "./../../assets/icons/like.svg";
import heartIcon from "./../../assets/icons/heart.svg";
import commentIcon from "./../../assets/icons/comment.svg";
import useAuthContext from "../../hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function BlogActions() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: location.pathname });
    }
  };
  const handleFavourite = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: location.pathname });
    }
  };

  const handleGoToComment = (event) => {
    if (!isAuthenticated) {
      event.preventDefault();

      navigate("/login", { state: location.pathname });
    }
  };

  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li onClick={handleLike}>
          <img src={likeIcon} alt="like" />
          <span>10</span>
        </li>
        <li onClick={handleFavourite}>
          {/* There is heart-filled.svg in the icons folder */}
          <img src={heartIcon} alt="Favourite" />
        </li>
        <a onClick={handleGoToComment} href="#comments">
          <li>
            <img src={commentIcon} alt="Comments" />
            <span>3</span>
          </li>
        </a>
      </ul>
    </div>
  );
}
