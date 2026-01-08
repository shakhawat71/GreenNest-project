import { Link, NavLink } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Active link styles for navigation
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "font-medium text-green-700"
      : "font-medium text-black hover:text-green-700 transition";

  // Active style for Login/Register buttons
  const authBtnStyle = ({ isActive }) =>
    isActive
      ? "btn btn-success btn-sm text-white"
      : "btn btn-outline btn-success btn-sm bg-white";

  const authBtnStyleMobile = ({ isActive }) =>
    isActive
      ? "btn btn-success btn-xs text-white"
      : "btn btn-outline btn-success btn-xs bg-white";

  return (
    <div className="navbar mb-4 shadow-md px-4 bg-linear-to-r from-green-300 via-white to-green-300">
      {/* Mobile: Left Hamburger Menu */}
      <div className="navbar-start md:hidden">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <NavLink to="/" className={navLinkStyle}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/plants" className={navLinkStyle}>
                Plants
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={navLinkStyle}>
                My Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile: Center Logo */}
      <div className="navbar-center md:hidden">
        <Link to="/" className="cursor-pointer">
          <img src={Logo} alt="GreenNest Logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Mobile: Right Auth */}
      <div className="navbar-end md:hidden">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 rounded-full ring ring-green-600 ring-offset-2">
                <img
                  alt="User Avatar"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <span className="font-semibold text-green-800">
                  {user.displayName || "User"}
                </span>
              </li>
              <li>
                <NavLink to="/profile">My Profile</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login" className={authBtnStyleMobile}>
              Login
            </NavLink>
            <NavLink to="/register" className={authBtnStyleMobile}>
              Register
            </NavLink>
          </div>
        )}
      </div>

      {/* Desktop / Laptop Layout */}
      <div className="hidden md:flex w-full items-center">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="cursor-pointer">
            <img src={Logo} alt="GreenNest Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex gap-10 justify-center flex-1">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/plants" className={navLinkStyle}>
            Plants
          </NavLink>

          <NavLink to="/profile" className={navLinkStyle}>
            My Profile
          </NavLink>
        </div>

        {/* Right: Auth */}
        <div className="flex-1 flex justify-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-green-600 ring-offset-2">
                  <img
                    alt="User Avatar"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
              >
                <li>
                  <span className="font-semibold text-green-800">
                    {user.displayName || "User"}
                  </span>
                </li>

                <li className="text-green-800">
                  <NavLink to="/profile">My Profile</NavLink>
                </li>

                <li className="text-green-800">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <NavLink to="/login" className={authBtnStyle}>
                Login
              </NavLink>

              <NavLink to="/register" className={authBtnStyle}>
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
