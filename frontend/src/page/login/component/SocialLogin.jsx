import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

const SocialLogin = () => {
  return (
    <>
      <div className="mt-4 flex items-center">
        <div className="w-full border-b" />
      </div>
      <div className="relative my-4">
        <div className="relative flex justify-center text-sm">
          <span className="px-2">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium">
          <GoogleIcon fontSize="small" className="text-primary" />
          <span>Google</span>
        </button>

        <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium">
          <FacebookIcon fontSize="small" className="text-primary" />
          <span>Facebook</span>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
