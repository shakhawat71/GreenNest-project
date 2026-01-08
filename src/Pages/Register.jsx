import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  // ✅ Password validation
  const validatePassword = (pass) => {
    if (!/[A-Z]/.test(pass)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(pass)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (pass.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  //  Register function
  const handleRegister = async (e) => {
    e.preventDefault();

    const validationMsg = validatePassword(password);
    if (validationMsg) {
      setPasswordError(validationMsg);
      return;
    }

    setPasswordError("");

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      //  Update user profile with name & photo
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success("Signup Successful ✅");

      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  Google Login Function
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      toast.success("Google Login Successful ✅");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#C8E6C9] px-4">
      <div className="card w-full max-w-md shadow-2xl bg-linear-to-b from-green-800 via-green-300 to-white">
        <div className="card-body">
          {/*  Title */}
          <h2 className="text-4xl font-bold text-center text-white">
            Signup 
          </h2>

          {/*  Form */}
          <form onSubmit={handleRegister} className="space-y-4 mt-8">
            {/*  Name */}
            <input
              type="text"
              placeholder="Name"
              className="input w-full bg-green-100 text-black placeholder:text-gray-600 border-none focus:outline-none focus:ring-2 focus:ring-green-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/*  Photo URL */}
            <input
              type="text"
              placeholder="Photo URL"
              className="input w-full bg-green-100 text-black placeholder:text-gray-600 border-none focus:outline-none focus:ring-2 focus:ring-green-700"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="input w-full bg-green-100 text-black placeholder:text-gray-600 border-none focus:outline-none focus:ring-2 focus:ring-green-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/*  Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input w-full bg-green-100 text-black placeholder:text-gray-600 border-none focus:outline-none focus:ring-2 focus:ring-green-700 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-800 font-bold"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>


            {/*  Password Error */}
            {passwordError && (
              <p className="text-red-600 font-semibold text-sm">
                {passwordError}
              </p>
            )}

            {/*  Register Button */}
            <button type="submit" className="btn btn-success w-full text-white">
              Register
            </button>
          </form>

          {/*  Google Login */}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black w-full hover:bg-gray-200 border-none"
            >
              Continue with Google
            </button>
          </div>

          {/*  Login Link */}
          <p className="text-center mt-6 text-black font-semibold">
            Already have an account?{" "}
            <Link to="/login" className="text-green-900 font-bold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
