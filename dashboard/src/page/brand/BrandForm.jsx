import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation } from "@tanstack/react-query";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { managementApi } from "../../api/managementApi";

export default function BrandForm({ mode }) {
  const navigate = useNavigate();
  const loaderData = useLoaderData({ strict: false });
  const brand = mode === "edit" ? loaderData : null;

  // ✅ single source of truth
  const [form, setForm] = useState({
    brandName: brand?.brandName || "",
    description: brand?.description || "",
    brandLogo: brand?.brandLogo || "",
    logoFile: null,
  });

  const updateForm = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: (formData) => {
      if (mode === "create") {
        return managementApi.createBrand(formData);
      }
      return managementApi.updateBrand(brand.id, formData);
    },
    onSuccess: () => {
      navigate({ to: "/brands" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brandName", form.brandName);
    formData.append("description", form.description);

    if (form.logoFile) {
      formData.append("logo", form.logoFile);
    }

    mutation.mutate(formData);
  };

  return (
    <main className="p-8">
      <form onSubmit={handleSubmit}>
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {mode === "create" ? "Create Brand" : "Edit Brand"}
              </h1>
              <p className="mt-1 text-sm text-gray-500">Update brand details and settings.</p>
            </div>

            {mode === "edit" && (
              <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
                <span className="mr-2 text-xs font-medium tracking-wider text-gray-400 uppercase">ID</span>
                <span className="font-mono text-xs text-gray-600">{brand.id}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-8 p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Brand name column */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                <input
                  value={form.brandName}
                  onChange={(e) => updateForm("brandName", e.target.value)}
                  placeholder="e.g. Adidas"
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 sm:text-sm"
                />
              </div>

              {/* Logo column */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Brand Logo</label>

                <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-gray-50">
                  {form.logoFile ? (
                    <img
                      src={URL.createObjectURL(form.logoFile)}
                      alt="Brand logo preview"
                      className="h-full w-full object-contain"
                    />
                  ) : form.brandLogo ? (
                    <img src={form.brandLogo} alt="Brand logo" className="h-full w-full object-contain" />
                  ) : (
                    <span className="text-sm text-gray-400">No logo</span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Brand Description</label>
              <textarea
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                rows={4}
                maxLength={500}
                placeholder="Enter a brief description of the brand..."
                className="block w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-3 text-gray-900 sm:text-sm"
              />
              <p className="text-right text-xs text-gray-500">{form.description.length}/500 characters</p>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <div className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 transition-colors hover:bg-gray-50">
                <div className="space-y-1 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <CloudUploadIcon size="medium" />
                  </div>

                  <label className="cursor-pointer text-sm font-medium text-indigo-600">
                    Update Brand logo
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => updateForm("logoFile", e.target.files[0])}
                    />
                  </label>

                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>

                  {form.logoFile && <p className="mt-1 text-xs text-gray-700">Selected: {form.logoFile.name}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-4 border-t border-gray-100 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={() => navigate({ to: "/brands" })}
              className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>

            <button
              type="submit"
              disabled={mutation.isLoading}
              className="cursor-pointer rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
