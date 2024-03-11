import { Link } from "react-router-dom";
import { stringToTagFormate } from "./../../utils/tagFormate";

export default function FavouriteItem({ item }) {
  return (
    <li>
      <Link to={`/blog/${item.id}`}>
        <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
          {item?.title}
        </h3>
      </Link>

      <p className="text-slate-600 text-sm">{stringToTagFormate(item?.tags)}</p>
    </li>
  );
}
