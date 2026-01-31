import React, { useState } from "react";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import SocialLogin from "./component/SocialLogin";

const Login = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const onChangeForm = (formName) => {
    setCurrentForm((prev) => (prev === formName ? prev : formName));
  };

  const indicatorClass = (active) =>
    [
      "absolute inset-y-1 w-[40%] rounded-md bg-primary",
      "transition-transform duration-300 ease-in-out",
      active === "login" ? "translate-x-[10%]" : "translate-x-[130%]",
    ].join(" ");

  const tabClass = (active) =>
    [
      "relative z-10 flex-1 py-2 text-sm font-semibold rounded-md text-lg cursor-pointer",
      "transition-colors duration-200",
      active ? "text-white" : "text-black hover:text-black ",
    ].join(" ");

  return (
    <div className="flex justify-center py-4">
      <div className="w-full max-w-4xl rounded-2xl px-4 shadow-2xl sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden md:grid-cols-2">
          {/* LEFT IMAGE */}
          <div className="hidden md:block">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGw8d-HDqP3dKR0BIQFpZe3tiJJm_1sipcgPs15Q5vledkJRs3tQX2EfNtUCyQcumh8ZOkCn0fN2UHXRaQhM3GKZZNkIPv9wNo9pB09cy6FaQHe6hJiZT1Dugslpl2de4-LTjF0CVTPNES9vskm2RmbR311SYd-lwneJ6BuBO_G5JuWwkhw54WoFM7rOGoGJqNSjvZJS7W7AsntC2xcrvWU1fC10EYZSSh0JflP2_oNDwx16zBSK04cVrkMhrcIGTImZrcw5uJNMJJ"
              alt="Stylish shoes"
              className="h-full w-full object-cover"
            />
          </div>

          {/* RIGHT CARD */}
          <div className="w-full p-4 md:p-6">
            {/* LOGIN / REGISTER TOGGLE */}
            <div className="mb-6 flex justify-center">
              <div className="relative inline-flex w-48 rounded-lg border p-1">
                {/* Sliding indicator */}
                <span className={indicatorClass(currentForm)} />

                <button
                  type="button"
                  onClick={() => onChangeForm("login")}
                  className={tabClass(currentForm === "login")}>
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => onChangeForm("register")}
                  className={tabClass(currentForm === "register")}>
                  Register
                </button>
              </div>
            </div>

            {currentForm === "login" ? <LoginForm /> : <RegisterForm />}

            {/* <SocialLogin /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
