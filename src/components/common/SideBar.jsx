import Favourites from "../blog/Favourites";
import PopularBlogs from "../blog/PopularBlogs";

export default function SideBar() {
  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <PopularBlogs />
      <Favourites />
    </div>
  );
}
