// src/components/Login.jsx
import React from "react";
import { useRef, useState } from "react";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../../api/authApi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate(); // <-- call hook at top-level

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      navigate({ to: "/products" });
    },
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="font-display flex min-h-screen items-center justify-center bg-[#071021] px-6 text-slate-200">
      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-8 py-12 lg:grid-cols-12">
        {/* LEFT SIDE */}
        <aside className="flex items-center justify-center text-center lg:col-span-7 lg:justify-start lg:text-left">
          <div className="max-w-lg pl-4 lg:pl-12">
            <div className="mb-6 flex items-center justify-center gap-4 text-center lg:justify-start lg:text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-md">
                <GppGoodOutlinedIcon fontSize="large" />
              </div>
              <span className="ext-slate-200 text-2xl font-bold lg:text-4xl">System Admin</span>
            </div>

            <h1 className="mb-4 text-4xl leading-tight font-extrabold text-white lg:text-5xl">Admin Dashboard</h1>
            <p className="text-lg text-slate-400">Secure access for authorized personnel.</p>
          </div>
        </aside>

        {/* RIGHT SIDE - LOGIN CARD */}
        <main className="flex items-center justify-center lg:col-span-5">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-[#17313b] bg-[#0f232f] p-8 shadow-lg">
              <h2 className="mb-2 text-3xl font-bold text-white">Sign In</h2>
              <p className="mb-6 text-slate-400">Welcome back, please enter your details.</p>

              <form className="space-y-5" onSubmit={handleOnSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Username</label>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-[#19303a] bg-[#071928] px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
                  <div className="relative">
                    <input
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-[#19303a] bg-[#071928] px-4 py-3 pr-12 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
                      onClick={() => togglePassword()}>
                      {showPassword ? <VisibilityOffIcon fontSize="medium" /> : <VisibilityIcon fontSize="medium" />}
                    </button>
                  </div>
                </div>
                {loginMutation.isError && (
                  <p className="text-sm text-red-500">
                    {loginMutation.error?.response?.data?.detail || "Login failed. Please try again."}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-700">
                  Login
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
