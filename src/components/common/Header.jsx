import siteLogo from "./../../assets/logo.svg";
import searchIcon from "./../../assets/icons/search.svg";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, auth, setAuth } =
    useAuthContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setAuth({});
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const firstletter = auth?.user?.firstName[0];

  return (
    <header>
      <nav className="container">
        {/* Logo */}
        <div>
          <Link to="/">
            <img className="w-32" src={siteLogo} alt="lws" />
          </Link>
        </div>
        {/* Actions - Login, Write, Home, Search */}
        {/* Notes for Developers */}
        {/* For Logged in User - Write, Profile, Logout Menu */}
        {/* For Not Logged in User - Login Menu */}
        <div>
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/create-blog"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Write
              </Link>
            </li>

            <li>
              <a
                href="./search.html"
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={searchIcon} alt="Search" />
                <span>Search</span>
              </a>
            </li>

            <li>
              {isAuthenticated ? (
                <span
                  onClick={handleLogout}
                  className="text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  Logout
                </span>
              ) : (
                <Link
                  to="/login"
                  className="text-white/50 hover:text-white transition-all duration-200"
                >
                  Login
                </Link>
              )}
            </li>
            {isAuthenticated && (
              <li className="flex items-center">
                {/* Circular Div with background color */}
                {auth?.user?.avatar ? (
                  <div className="avater-img bg-orange-600 text-white">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                      }/uploads/avatar/${auth?.user?.avatar}`}
                      alt={auth?.user?.firstName}
                    />
                  </div>
                ) : (
                  <div className="avater-img bg-orange-600 text-white">
                    <span>{firstletter}</span>
                  </div>
                )}

                {/* Logged-in user's name */}
                <Link to="/profile">
                  <span className="text-white ml-2">
                    {auth?.user?.firstName} {auth?.user?.lastName}
                  </span>
                </Link>
                {/* Profile Image */}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
