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

  // ✅ Active link styles for navigation
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "font-medium text-green-600"
      : "font-medium text-black hover:text-green-600";

  // ✅ Active style for Login/Register buttons
  const authBtnStyle = ({ isActive }) =>
    isActive
      ? "btn btn-success btn-sm text-white"
      : "btn btn-outline btn-success btn-sm";

  const authBtnStyleMobile = ({ isActive }) =>
    isActive
      ? "btn btn-success btn-xs text-white"
      : "btn btn-outline btn-success btn-xs";

  return (
    <div className="navbar bg-white shadow-sm px-4">
      {/* ✅ Mobile: Left Hamburger Menu */}
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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

      {/* ✅ Mobile: Center Logo */}
      <div className="navbar-center md:hidden">
        <Link to="/" className="cursor-pointer">
          <img src={Logo} alt="GreenNest Logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* ✅ Mobile: Right Auth */}
      <div className="navbar-end md:hidden">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 rounded-full">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <span className="font-semibold">
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

      {/* ✅ Desktop / Laptop Layout */}
      <div className="hidden md:flex w-full items-center">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link to="/" className="cursor-pointer">
            <img src={Logo} alt="GreenNest Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        <div className="flex gap-8 justify-center flex-1">
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
                <div className="w-10 rounded-full">
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <span className="font-semibold">
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
