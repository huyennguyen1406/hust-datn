import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../../../auth";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onRegisterButtonClick = (e) => {
    e.preventDefault();
    login();
    navigate({ to: "/account" });
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
        <p className="mt-1">Start your journey with us.</p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={(e) => onRegisterButtonClick(e)}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium">
              First Name
            </label>
            <input
              id="first-name"
              name="first-name"
              type="text"
              placeholder="John"
              className="focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg transition-colors focus:ring"
            />
          </div>

          <div>
            <label htmlFor="last-name" className="text-sm font-medium">
              Last Name
            </label>
            <input
              id="last-name"
              name="last-name"
              type="text"
              placeholder="Doe"
              className="focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg transition-colors focus:ring"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg transition-colors focus:ring"
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
              placeholder="••••••••"
              className="focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg pr-10 transition-colors focus:ring"
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600">
              {showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <input
            id="subscribe"
            name="subscribe"
            type="checkbox"
            className="text-primary focus:ring-primary/50 mt-0.5 h-4 w-4 rounded"
          />
          <label htmlFor="subscribe">Subscribe to email updates</label>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="text-primary focus:ring-primary/50 mt-0.5 h-4 w-4 rounded"
          />
          <label htmlFor="terms">
            I agree with the{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Terms and Conditions
            </a>
          </label>
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 mt-4 flex h-12 w-full max-w-[480px] min-w-[84px] items-center justify-center rounded-lg px-5 text-base font-bold text-white transition-colors">
          <span className="truncate">Register</span>
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
