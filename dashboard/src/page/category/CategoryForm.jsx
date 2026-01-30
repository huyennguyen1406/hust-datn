import { useState } from "react";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { managementApi } from "../../api/managementApi";
import BannerForm from "./BannerForm";

export default function CategoryForm({
  mode, // "create" | "edit"
}) {
  const navigate = useNavigate();
  const isEditMode = mode === "edit";
  const loaderData = useLoaderData({ strict: false });
  const category = isEditMode ? loaderData : null;

  /* =========================
     State initialization
     ========================= */
  const [form, setForm] = useState(() => ({
    nameEn: category?.nameEn ?? "",
    nameVi: category?.nameVi ?? "",
  }));

  const [banners, setBanners] = useState(
    () =>
      category?.banners?.map((b) => ({
        id: b.id,
        titleEn: b.titleEn,
        titleVi: b.titleVi,
        descriptionEn: b.descriptionEn,
        descriptionVi: b.descriptionVi,
        imageLink: b.imageLink,
      })) ?? []
  );

  /* =========================
     Handlers
     ========================= */
  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addBanner = () => {
    setBanners((prev) => [
      ...prev,
      {
        titleEn: "",
        titleVi: "",
        descriptionEn: "",
        descriptionVi: "",
      },
    ]);
  };

  const removeBanner = (index) => {
    setBanners((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBanner = (index, field, value) => {
    setBanners((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  /* =========================
     Submit
     ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const bannerPayload = [];
    const bannerImages = [];

    banners.forEach((banner) => {
      const payload = {
        titleEn: banner.titleEn,
        titleVi: banner.titleVi,
        descriptionEn: banner.descriptionEn,
        descriptionVi: banner.descriptionVi,
      };

      if (banner.id) {
        payload.id = banner.id;
      }

      if (banner.imageFile) {
        payload.imageIndex = bannerImages.length;
        bannerImages.push(banner.imageFile);
      }

      bannerPayload.push(payload);
    });

    formData.append(
      "category",
      new Blob(
        [
          JSON.stringify({
            nameEn: form.nameEn,
            nameVi: form.nameVi,
            banners: bannerPayload,
          }),
        ],
        { type: "application/json" }
      )
    );

    bannerImages.forEach((file) => {
      formData.append("bannerImages", file);
    });

    if (isEditMode) {
      await managementApi.updateCategory(category.id, formData);
    } else {
      await managementApi.createCategory(formData);
    }

    navigate({ to: "/categories" });
  };

  /* =========================
     Render
     ========================= */
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Category info */}
      <div className="space-y-4 rounded border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-600">{isEditMode ? "Edit Category" : "Create Category"}</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-500">Name (EN)</label>
            <input
              value={form.nameEn}
              onChange={(e) => updateForm("nameEn", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Name (VI)</label>
            <input
              value={form.nameVi}
              onChange={(e) => updateForm("nameVi", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Banners */}
      <div className="space-y-4 rounded border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-600">Category Banners</h2>

          <button
            type="button"
            onClick={addBanner}
            className="cursor-pointer rounded bg-indigo-600 px-3 py-1 text-sm text-white">
            + Add Banner
          </button>
        </div>

        {banners.length === 0 && <p className="text-sm text-gray-500">No banners added</p>}

        {banners.map((banner, index) => (
          <BannerForm
            key={banner.id ?? index}
            index={index}
            banner={banner}
            onChange={updateBanner}
            onRemove={removeBanner}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 border-t border-gray-100 bg-gray-50 px-6 py-4">
        <button
          type="button"
          onClick={() => navigate({ to: "/brands" })}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
          {isEditMode ? "Update Category" : "Create Category"}
        </button>
      </div>
    </form>
  );
}
