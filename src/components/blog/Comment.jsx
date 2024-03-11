import { Link } from "react-router-dom";

export default function Comment({ item }) {
  const firstLetter = item?.author?.firstName[0];
  return (
    <div className="flex items-start space-x-4 my-8">
      <div className="avater-img bg-orange-600 text-white">
        {item?.author?.avatar ? (
          <img
            className="w-10 h-10 rounded-full"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
              item?.author?.avatar
            }`}
            alt={item?.author?.firstName}
          />
        ) : (
          <span className="">{firstLetter}</span>
        )}
      </div>
      <div className="w-full">
        <Link to={`/profile/${item?.author?.id}`}>
          <h5 className="text-slate -500 font-bold">
            {item?.author?.firstName} {item?.author?.lastName}
          </h5>
        </Link>

        <p className="text-slate-300">{item?.content}</p>
      </div>
    </div>
  );
}
