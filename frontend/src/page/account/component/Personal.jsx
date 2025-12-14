import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const Personal = () => {
  return (
    <div className="bg-card rounded-xl p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Personal Information</h2>

      <div className="mb-6 flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative">
          <div className="border-border flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border">
            <img
              src="https://www.loremfaces.net/256/id/1.jpg"
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold">John Doe</h3>
          <p className="text-text/70">john.doe@example.com</p>
          <button type="button" className="text-primary mt-2 text-sm font-medium hover:underline">
            Change Profile Image
          </button>
        </div>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="first-name">
              First Name
            </label>
            <input
              id="first-name"
              name="first-name"
              type="text"
              defaultValue="John"
              placeholder="John"
              className="bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
            />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="last-name">
              Last Name
            </label>
            <input
              id="last-name"
              name="last-name"
              type="text"
              defaultValue="Doe"
              placeholder="Doe"
              className="bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 flex h-12 min-w-[84px] items-center justify-center rounded-lg px-5 text-base font-bold text-white transition-colors">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Personal;
