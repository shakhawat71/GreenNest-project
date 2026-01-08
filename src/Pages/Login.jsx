import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const location = useLocation();
  const navigate = useNavigate();

  

  // desired route (PlantDetails etc.) OR Home page
  const from = location.state?.from?.pathname || "/";

  // Login with Email & Password
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful ✅");

      //navigate user to desired route or Home
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Invalid email or password ❌");
    }
  };

  // Forget Password
 const handleForgetPassword = async () => {
  if (!email) {
    toast.error("Please enter your email first ❗");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Reset email sent ✅ Redirecting to Gmail...");

    setTimeout(() => {
      window.open("https://mail.google.com", "_blank");
    }, 1500);
  } catch (error) {
    toast.error(error.message);
  }
};

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      toast.success("Google Login Successful ✅");

      // navigate user to desired route or Home
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Google login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#C8E6C9] px-4">
      {/* Gradient Card */}
      <div className="card w-full max-w-md shadow-2xl bg-linear-to-b from-green-800 via-green-300 to-white">
        <div className="card-body">
          {/* Title */}
          <h2 className="text-4xl font-bold text-center text-white">
            Login 
          </h2>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 mt-8">
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="input w-full bg-green-100 text-black placeholder:text-gray-600 border-none focus:outline-none focus:ring-2 focus:ring-green-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/*Password */}
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


            {/* Forget Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-sm font-bold text-white hover:text-green-900 underline"
              >
                Forget Password?
              </button>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-success w-full text-white">
              Login
            </button>
          </form>

          {/*Google Login */}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black w-full hover:bg-gray-200 border-none"
            >
              Continue with Google
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-center mt-6 text-black font-semibold">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-900 font-bold underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
