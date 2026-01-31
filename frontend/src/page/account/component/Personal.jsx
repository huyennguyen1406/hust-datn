import { useRef, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getAccountInfoApi, postAccountInfoApi } from "../../../api/userAccountApi";

const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg";

const Personal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const fileInputRef = useRef(null);

  /* =========================
     Query: get account info
     ========================= */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["account-info"],
    queryFn: getAccountInfoApi,
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      if (data.imageLink) {
        setAvatarPreview(data.imageLink);
      }
    },
    onError: () => {
      navigate({ to: "/login", replace: true });
    },
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarSrc = avatarPreview ?? data?.imageLink ?? DEFAULT_AVATAR;

  /* =========================
     Mutation: update profile
     ========================= */
  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: postAccountInfoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-info"] });
      alert("Profile updated successfully");
    },
    onError: () => {
      alert("Profile update failed");
    },
  });

  /* =========================
     Avatar change
     ========================= */
  const onAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));
  };

  /* =========================
     Submit
     ========================= */
  const onSubmit = (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current?.value.trim();
    const lastName = lastNameRef.current?.value.trim();
    const avatarFile = fileInputRef.current?.files?.[0];

    if (!firstName || !lastName) {
      alert("First name and last name are required");
      return;
    }

    const confirmed = window.confirm("Do you want to update your profile?");
    if (!confirmed) return;

    updateProfile({
      firstName,
      lastName,
      avatar: avatarFile,
    });
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-500">Failed to load data</div>;
  }

  return (
    <div className="bg-card rounded-xl p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Personal Information</h2>

      {/* ================= Avatar ================= */}
      <div className="mb-6 flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative">
          <div className="border-border flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border">
            <img src={avatarSrc} alt="User avatar" className="h-full w-full object-cover" />
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-primary hover:bg-primary/90 absolute right-0 bottom-0 cursor-pointer rounded-full p-2 text-white shadow">
            <ModeEditIcon fontSize="small" />
          </button>

          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onAvatarChange} />
        </div>

        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold">
            {data.firstName} {data.lastName}
          </h3>
          <p className="text-text/70">{data.email}</p>
        </div>
      </div>

      {/* ================= Form ================= */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input
              ref={(el) => {
                if (el && data) el.value = data.firstName ?? "";
                firstNameRef.current = el;
              }}
              type="text"
              placeholder="First name"
              className="bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input
              ref={(el) => {
                if (el && data) el.value = data.lastName ?? "";
                lastNameRef.current = el;
              }}
              type="text"
              placeholder="Last name"
              className="bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-lg border transition-colors focus:ring"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-primary/90 flex h-12 min-w-[84px] cursor-pointer items-center justify-center rounded-lg px-5 text-base font-bold text-white transition-colors disabled:opacity-50">
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Personal;
