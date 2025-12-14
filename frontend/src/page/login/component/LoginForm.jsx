import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../../../auth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onLoginButtonClick = (e) => {
    console.log("Trigger");
    e.preventDefault();
    login();
    navigate({ to: "/account" });
  };

  return (
    <>
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
        <p className="mt-1">Please enter your details to sign in.</p>
      </div>

      {/* FORM */}
      <form className="flex flex-col gap-4" onSubmit={(e) => onLoginButtonClick(e)}>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border pr-10 transition-colors focus:ring"
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600">
              {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
            </button>
          </div>{" "}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <input id="remember" type="checkbox" className="text-primary focus:ring-primary/50 h-4 w-4 rounded" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="text-primary font-medium hover:underline">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 mt-4 flex h-12 w-full items-center justify-center rounded-lg px-5 text-base font-bold text-white transition-colors">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
