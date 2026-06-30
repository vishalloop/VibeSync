import { useState , useEffect} from "react";
import { useNavigate, useSearchParams } from "react-router";
import {useAuth} from "../hooks/useAuth.js";
import { useSelector } from "react-redux";

const Login = () => {

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const { handleLogin } = useAuth();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [searchParams] = useSearchParams();

  const oAuthError = searchParams.get("error");

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if(loading) return <div>Loading...</div>
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await handleLogin(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  }

  return (
    <div className="flex h-screen sm:w-screen md:w-auto">
      <div className="hidden lg:flex">
        <img src="/illustration.png" className="h-full" alt="illustration" />
      </div>
      <div className="py-4 px-4 md:py-20 md:px-20 flex flex-col justify-around gap-10 w-screen lg:w-auto">
        <div className="flex flex-col gap-6  md:gap-12 lg:gap-8">
          <div>
            <img
              src="/group-1686550876.png"
              className="h-9 md:h-12"
              alt="brand-logo"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-nunito text-2xl md:text-4xl font-bold text-[#555555]">
              Login to your Account
            </div>
            <div className="font-nunito text-[#3d3d3d]">
              Let's see what's your vibe right now 
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-8">
            <div onClick={handleGoogleLogin} className="flex gap-3 justify-center items-center bg-[#d1cdcd] rounded p-2 w-75 md:w-105 cursor-pointer active:scale-98">
              <div>
                <img src="/google.png" className="h-5" alt="google" />
              </div>
              <div>Continue with Google</div>
            </div>
            <div className="font-nunito text-[#9a9a9a] flex">
              -------------&nbsp;
              <p className="font-medium">or Sign in with Email</p>
              &nbsp;-------------
            </div>
          </div>
          {oAuthError && (
            <p className="text-red-600 text-sm text-center">
              {oAuthError}
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-10 sm:items-center sm:justify-center">
            <div className="flex flex-col gap-5 sm:items-center sm:justify-center">
              <div className="flex flex-col gap-1.5 items-center">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="self-start">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => {setEmail(e.target.value)}}
                    className='w-75 md:w-105 px-3 py-3 rounded-lg border-2 border-[#E2D8DD] text-md outline-none focus:outline-none focus:ring-0 focus:border-pink-900 transition-colors duration-200"'
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 items-center">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={(e) => {setPassword(e.target.value)}}
                    className='w-75 md:w-105 px-3 py-3 rounded-lg border-2 border-[#E2D8DD] text-md outline-none focus:outline-none focus:ring-0 focus:border-pink-900 transition-colors duration-200"'
                  />
                </div>
              </div>
            </div>
            <button 
            disabled={submitting}
            className="self-center font-nunito bg-[#7F265B] rounded-lg px-2 py-3 w-75 md:w-105 cursor-pointer active:scale-98 text-white font-medium text-lg">
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}
        </div>
        <div className="flex justify-center items-center font-medium">
          <p className="text-[#9a9a9a]">Not Registered Yet?</p>&nbsp;
          <p onClick={() => navigate("/register")} className="text-[#7F265B] cursor-pointer">Create an account</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
