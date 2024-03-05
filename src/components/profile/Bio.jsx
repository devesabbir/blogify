import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
import editIcon from "./../../assets/icons/edit.svg";
import checkIcon from "./../../assets/icons/check.svg";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

export default function Bio() {
  const { auth } = useAuth();
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const user = state?.user ?? auth?.user;
  const [bio, setBio] = useState(user?.bio);
  const [bioEdit, setBioEdit] = useState(false);

  const handleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const res = await api.patch(`/profile/${state?.user?.id}`, { bio: bio });
      if (res.status === 200) {
        dispatch({ type: actions.profile.USER_DATA_EDITED, data: res.data });
        setBioEdit(false);
      }
    } catch (error) {
      dispatch({ type: actions.profile.DATA_FETCHED_ERROR, error: error });
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!bioEdit ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">{user?.bio}</p>
        ) : (
          <textarea
            className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
            value={bio}
            rows={4}
            cols={55}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {/* Edit Bio button. The Above bio will be editable when clicking on the button */}
      {!bioEdit ? (
        <button
          onClick={() => setBioEdit(true)}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img src={editIcon} alt="Edit" />
        </button>
      ) : (
        <button
          onClick={handleBioEdit}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img src={checkIcon} alt="Edit" />
        </button>
      )}
    </div>
  );
}
