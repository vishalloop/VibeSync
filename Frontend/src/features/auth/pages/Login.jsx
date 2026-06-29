import React from "react";

const Login = () => {
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
              See what is going on with your business
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="flex gap-3 justify-center items-center bg-[#d1cdcd] rounded p-2 w-75 md:w-105 cursor-pointer active:scale-98">
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
          <form className="flex flex-col gap-10 sm:items-center sm:justify-center">
            <div className="flex flex-col gap-5 sm:items-center sm:justify-center">
              <div className="flex flex-col gap-1.5 items-center">
                <div className="flex flex-col gap-1.5">
                  <label for="email" className="self-start">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    className='w-75 md:w-105 px-3 py-3 rounded-lg border-2 border-[#E2D8DD] text-md outline-none focus:outline-none focus:ring-0 focus:border-pink-900 transition-colors duration-200"'
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 items-center">
                <div className="flex flex-col gap-1.5">
                  <label for="assword">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Email"
                    className='w-75 md:w-105 px-3 py-3 rounded-lg border-2 border-[#E2D8DD] text-md outline-none focus:outline-none focus:ring-0 focus:border-pink-900 transition-colors duration-200"'
                  />
                </div>
              </div>
            </div>
            <button className="self-center font-nunito bg-[#7F265B] rounded-lg px-2 py-3 w-75 md:w-105 cursor-pointer active:scale-98 text-white font-medium text-lg">
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center font-medium">
          <p className="text-[#9a9a9a]">Not Registered Yet?</p>&nbsp;
          <p className="text-[#7F265B] cursor-pointer">Create an account</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
