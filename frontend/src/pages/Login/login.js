import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { PORT } from "../../congif";
import { useAuth } from "../../auth/authContext";
import axiosnew from "../../axios";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "password" });
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // To get the previous route

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/process", { replace: true });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosnew.post(`/user/login`, data, {
        withCredentials: true,
      });

      const userData = await response.data.user;
      login(userData); // Log in the user

      // If there's a previous route, navigate back to it. Otherwise, go to /process
      const from = location.state?.from?.pathname || "/process";
      navigate(from, { replace: true }); // 'replace: true' to avoid going back to login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-40 justify-center content-center h-screen bg-violet-950 px-16 bg-custom-gradient">
      <form className="text-black flex flex-col bg-white gap-4 justify-center w-450 h-626 rounded-2xl border-2 border-black p-10  font-poppins ">
        <div className="self-center text-3xl font-medium leading-51 tracking-wider">
          Log in to HR Tool
        </div>
        <div className="self-center text-base font-normal leading-5 tracking-wide">
          Please enter your details
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-base font-medium leading-5 tracking-wide"
          >
            Email
          </label>
          <br></br>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            className="mt-2 h-[49.58px] rounded-[12px] border border-[1px] w-full p-4 placeholder-base placeholder-light placeholder-leading-5 placeholder-tracking-wide"
          ></input>
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-base font-medium leading-5 tracking-wide"
          >
            Password
          </label>
          <input
            type="password"
            id="Password"
            placeholder="Enter your password"
            name="password"
            value={data.password}
            onChange={handleInputChange}
            className="mt-2 h-[49.58px] rounded-[12px] border border-[1px] w-full p-4 placeholder-base placeholder-light placeholder-leading-5 placeholder-tracking-wide"
          ></input>
        </div>

        <div className="flex justify-between text-xs font-medium leading-4 tracking-wide">
          <div className="remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="vehicle1"> Remember me</label>
          </div>

          <div className="forgot-password">Forgot password</div>
        </div>

        <button
          className="w-full bg-violet-600 h-[56px] rounded-[12px] border-2 text-base font-medium leading-33 tracking-wide text-white"
          onClick={handleLogin}
        >
          Sign in
        </button>

        <div className="self-center">OR</div>

        <button className="self-center flex justify-around gap-5 items-center h-[56px] rounded-[12px] border-2 w-full">
          <svg
            className="h-full"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <span>Sign in with Google</span>
          <div></div>
        </button>
      </form>

      <div className="">
        {/* <img src='/images/Buzztrend logo 1.png'></img> */}
        {/* <img></img> */}
      </div>
    </div>
  );
}
