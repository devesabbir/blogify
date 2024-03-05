// eslint-disable-next-line no-unused-vars
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import Bio from "./Bio";
import editIcon from "./../../assets/icons/edit.svg";
import { useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

export default function ProfileInfo() {
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const user = state?.user ?? auth?.user;

  const imageInputRef = useRef(null);

  const handleEditImage = (event) => {
    event.preventDefault();

    imageInputRef.current.addEventListener("change", updateImage);
    imageInputRef.current.click();
  };

  const updateImage = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const formData = new FormData();
      for (const file of imageInputRef.current.files) {
        formData.append("avatar", file);
      }

      const res = await api.post(
        `/profile/${state?.user?.id}/avatar`,
        formData
      );

      if (res.status === 200) {
        dispatch({ type: actions.profile.IMAGE_UPDATED, data: res.data });
      }
    } catch (error) {
      dispatch({ type: actions.profile.DATA_FETCHED_ERROR, error: error });
    }
  };

  return (
    <div className="flex flex-col items-center py-8 text-center">
      {/* profile image */}
      <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <img
          className="max-w-full rounded-full"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
          alt={state?.user?.firstName}
        />
        <button
          onClick={handleEditImage}
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
        >
          <img src={editIcon} alt="Edit" />
        </button>
        <input ref={imageInputRef} type="file" hidden />
      </div>
      {/* name , email */}
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {user?.firstName} {user?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{user.email}</p>
      </div>
      {/* bio */}
      <Bio />
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
    </div>
  );
}
