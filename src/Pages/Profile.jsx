import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Update form state
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const navigate = useNavigate();

  //  Get user info
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //  Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully ");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed ❌");
    }
  };

  //  Update Profile Handler
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name || !photoURL) {
      toast.error("Name & Photo URL cannot be empty ❌");
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Profile updated successfully ");

      //  Update UI instantly
      setUser({
  ...auth.currentUser,
  displayName: name,
  photoURL: photoURL,
});
    } catch (error) {
      toast.error("Update failed ");
    }
  };

  //  Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#C8E6C9]">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#C8E6C9] px-4 py-16">
      <div className="card w-full max-w-lg shadow-2xl bg-linear-to-b from-green-800 via-green-300 to-white">
        <div className="card-body items-center text-center">

          {/*  Profile Image */}
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-green-600 ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="User"
              />
            </div>
          </div>

          {/*  Name */}
          <h2 className="text-3xl font-bold text-white mt-4">
            {user?.displayName || "No Name Found"}
          </h2>

          {/*  Email */}
          <p className="text-lg text-black font-semibold mt-2">
            {user?.email}
          </p>

          {/*  Update Form */}
          <div className="mt-8 w-full bg-white/70 rounded-xl p-5 shadow-md">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              Update Profile 
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <input
                type="text"
                placeholder="Update Name"
                className="input w-full bg-green-200 text-black placeholder:text-gray-600 border-none focus:outline-none focus:ring-2 focus:ring-green-700"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Update Photo URL"
                className="input w-full bg-green-200 text-black placeholder:text-gray-600 border-none focus:outline-none focus:ring-2 focus:ring-green-700"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />

              <button type="submit" className="btn btn-success w-full text-white">
                Update Profile
              </button>
            </form>
          </div>

          {/*  Logout Button */}
          <button
            onClick={handleLogout}
            className="btn btn-outline bg-white btn-success w-full mt-6"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
