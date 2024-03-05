import logoutIcon from "./../../assets/icons/logout.svg";

import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <button onClick={handleLogout} className="icon-btn">
      <img src={logoutIcon} alt="Logout" />
    </button>
  );
}
