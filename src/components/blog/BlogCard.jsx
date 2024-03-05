import ReacRoadMapImg from "./../../assets/blogs/React-Roadmap.jpg";
import editIcon from "./../../assets/icons/edit.svg";
import deleteIcon from "./../../assets/icons/delete.svg";
import threeDotsIcon from "./../../assets/icons/3dots.svg";
import { Link } from "react-router-dom";

export default function BlogCard() {
  return (
    <div className="blog-card">
      <img className="blog-thumb" src={ReacRoadMapImg} alt="" />
      <div className="mt-2 relative">
        <Link to="/blog/1"></Link>
        <h3 className="text-slate-300 text-xl lg:text-2xl">
          <Link to="/blog/1"></Link>
          <Link to="/blog/1">React Roadmap in 2024</Link>
        </h3>
        <p className="mb-6 text-base text-slate-500 mt-1">
          Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor
          pretium donec dictum. Vici consequat justo enim. Venenatis eget
          adipiscing luctus lorem.
        </p>
        {/* Meta Informations */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">S</span>
            </div>
            <div>
              <h5 className="text-slate-500 text-sm">
                <Link to="/profile">Saad Hasan</Link>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>June 28, 2018</span>
              </div>
            </div>
          </div>
          <div className="text-sm px-2 py-1 text-slate-700">
            <span>100 Likes</span>
          </div>
        </div>
        {/* action dot */}
        <div className="absolute right-0 top-0">
          <button>
            <img src={threeDotsIcon} alt="3dots of Action" />
          </button>
          {/* Action Menus Popup */}
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={editIcon} alt="Edit" />
              Edit
            </button>
            <button className="action-menu-item hover:text-red-500">
              <img src={deleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        </div>
        {/* action dot ends */}
      </div>
    </div>
  );
}
