import { useRef } from "react";
import { toast } from "react-toastify";
import editIcon from "./../../assets/icons/edit.svg";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";
import { actions } from "../../actions";
import useAuthContext from "../../hooks/useAuthContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import Bio from "./Bio";

export default function ProfileInfo({ userData, isMe }) {
  const upImageRef = useRef(null);
  const { api } = useAxios();
  const { dispatch } = useProfile();
  const { auth, setAuth } = useAuthContext();
  const { setValue } = useLocalStorage("auth");

  const handleUploadClick = (event) => {
    event.preventDefault();
    upImageRef.current.click();
    upImageRef.current.addEventListener("change", uploadImage);
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      for (const file of upImageRef.current.files) {
        formData.append("avatar", file);
      }
      const res = await api.post(`/profile/avatar`, formData);
      if (res.status === 200) {
        dispatch({ type: actions.profile.DATA_FETCHED, data: res?.data?.user });
        setAuth((prev) => ({
          ...prev,
          user: {
            ...res?.data?.user,
          },
        }));
        const authObj = { ...auth, user: { ...res?.data?.user } };
        setValue(authObj);
        toast.success("Profile updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 text-center">
      {/* profile image */}
      <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
        <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full overflow-hidden">
          {/* User's first name initial */}
          {userData?.avatar ? (
            <img
              className="w-full h-full object-cover rounded-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                userData?.avatar
              }`}
              alt={userData?.firstName}
            />
          ) : (
            <span className="">
              {userData?.firstName && userData?.firstName[0]}
            </span>
          )}
        </div>

        {isMe && (
          <button
            onClick={handleUploadClick}
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
          >
            <img src={editIcon} alt="Edit" />
          </button>
        )}
        <input ref={upImageRef} type="file" hidden />
      </div>
      {/* name , email */}
      <div>
        <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
          {userData?.firstName} {userData?.lastName}
        </h3>
        <p className="leading-[231%] lg:text-lg">{userData?.email}</p>
      </div>
      <Bio userData={userData} isMe={isMe} />
      <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8" />
    </div>
  );
}
