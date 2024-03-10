import { useEffect, useState } from "react";
import editIcon from "./../../assets/icons/edit.svg";
import checkIcon from "./../../assets/icons/check.svg";
import closeIcon from "./../../assets/icons/close.svg";
import useAxios from "../../hooks/useAxios";
import useProfile from "../../hooks/useProfile";
import { actions } from "../../actions";
import { toast } from "react-toastify";

export default function Bio({ userData, isMe }) {
  const [bio, setBio] = useState(userData?.bio);
  const [bioEditMode, setBioEditMode] = useState(false);
  const { api } = useAxios();
  const { dispatch } = useProfile();

  const handleBioEdit = async () => {
    try {
      const res = await api.patch(`/profile`, { bio });
      if (res.status === 200) {
        dispatch({ type: actions.profile.DATA_FETCHED, data: res?.data?.user });
        setBioEditMode(false);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   update with previous data
  useEffect(() => {
    setBio(userData?.bio);
  }, [userData?.bio]);

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!bioEditMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {userData?.bio}
          </p>
        ) : (
          <textarea
            className="leading-[188%] text-gray-600 lg:text-lg rounded-md bg-neutral-800 p-2"
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
      {isMe &&
        (!bioEditMode ? (
          <button
            title="Edit Bio"
            onClick={() => setBioEditMode(true)}
            className="flex-center h-7 w-7 rounded-full"
          >
            <img src={editIcon} alt="Edit" />
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setBioEditMode(false)}
              className="flex-center h-7 w-7 rounded-full"
            >
              <img src={closeIcon} alt="close" />
            </button>
            <button
              onClick={handleBioEdit}
              className="flex-center h-7 w-7 rounded-full"
            >
              <img src={checkIcon} alt="check" />
            </button>
          </div>
        ))}
    </div>
  );
}
