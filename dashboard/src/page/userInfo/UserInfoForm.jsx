import { useState } from "react";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { managementUserApi } from "../../api/managementUserApi";

export default function UserInfoForm({ mode }) {
  const navigate = useNavigate();
  const isEditMode = mode === "edit";

  const loaderData = useLoaderData({ strict: false });
  const user = isEditMode ? loaderData : null;

  /* =========================
     State
     ========================= */
  const [form, setForm] = useState(() => ({
    id: user?.id ?? null,
    email: user?.email ?? "",
    password: "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    phoneNumber: user?.phoneNumber ?? "",
  }));

  /* =========================
     Handlers
     ========================= */
  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /* =========================
     Submit
     ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: form.id,
      email: form.email.trim(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phoneNumber: form.phoneNumber.trim(),
    };

    await managementUserApi.createOrUpdateUser(payload);
    navigate({ to: "/users" });
  };

  /* =========================
     Render
     ========================= */
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4 rounded border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-600">{isEditMode ? "Edit User" : "Create User"}</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              disabled={isEditMode}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-600 disabled:bg-gray-100"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <input
              value={form.phoneNumber}
              onChange={(e) => updateForm("phoneNumber", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-600 disabled:bg-gray-100"
              required
              disabled={isEditMode}
            />
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">First Name</label>
            <input
              value={form.firstName}
              onChange={(e) => updateForm("firstName", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-600"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Last Name</label>
            <input
              value={form.lastName}
              onChange={(e) => updateForm("lastName", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-600"
              required
            />
          </div>

          {/* Modified At */}
          {user?.modifiedAt && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Last Modified</label>
              <input
                type="text"
                value={new Date(user.modifiedAt).toLocaleString()}
                disabled
                className="mt-1 w-full rounded border bg-gray-100 px-3 py-2 text-gray-600"
              />
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 border-t border-gray-100 bg-gray-50 px-6 py-4">
        <button
          type="button"
          onClick={() => navigate({ to: "/users" })}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          {isEditMode ? "Update User" : "Create User"}
        </button>
      </div>
    </form>
  );
}
