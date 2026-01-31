import { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { registerApi } from "../../../api/authenticationApi";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);

  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      localStorage.setItem("store_access_token", data.accessToken);
      localStorage.setItem("store_refresh_token", data.refreshToken);

      navigate({ to: "/account" });
    },

    onError: (error) => {
      const response = error?.response;

      if (response?.status === 400) {
        setApiError(response.data?.detail || "Bad request");
        return;
      }

      setApiError("Something went wrong. Please try again.");
    },
  });

  const onRegisterButtonClick = (e) => {
    e.preventDefault();
    const payload = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      password: passwordRef.current.value,
    };

    registerMutation.mutate(payload);
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
              ref={firstNameRef}
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
              ref={lastNameRef}
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
            ref={emailRef}
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg transition-colors focus:ring"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="text-sm font-medium">
            Phone number
          </label>
          <input
            ref={phoneNumberRef}
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="0912345678"
            className="focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg transition-colors focus:ring"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              ref={passwordRef}
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

        {apiError && <p className="text-sm text-red-500">{apiError}</p>}

        <button
          type="submit"
          aria-label="Register"
          title="Register"
          className="bg-primary hover:bg-primary/90 mt-4 flex h-12 w-full max-w-[480px] min-w-[84px] cursor-pointer items-center justify-center rounded-lg px-5 text-base font-bold text-white transition-colors">
          <span className="truncate">Register</span>
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
