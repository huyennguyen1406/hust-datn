import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { managementApi } from "../../api/managementApi";
import { useI18n } from "../../i18n/useI18n";
import { formatPrice } from "../../utility/format";

export default function ProductForm({
  mode, // "create" | "edit"
}) {
  const navigate = useNavigate();
  const isEditMode = mode === "edit";
  const loaderData = useLoaderData({ strict: false });
  const { brands, categories, product } = loaderData;
  const { lang } = useI18n();

  /* =========================
     State initialization
     ========================= */
  const [form, setForm] = useState(() => ({
    nameEn: product?.productNameEn ?? "",
    nameVi: product?.productNameVi ?? "",
    brandId: product?.brand?.brandId ?? "",
    price: product?.price ?? "",
  }));

  const [selectedCategories, setSelectedCategories] = useState(
    () => product?.categoryList?.map((c) => c.categoryId) ?? []
  );

  const [images, setImages] = useState(
    () =>
      product?.imageList?.map((img) => ({
        id: img.imageId,
        imageLink: img.imageUrl,
      })) ?? []
  );

  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  /* ---------- Categories ---------- */
  const addCategory = (categoryId) => {
    if (!selectedCategories.includes(categoryId)) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    }
  };

  const removeCategory = (categoryId) => {
    setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
  };

  /* ---------- Images ---------- */
  const addImages = (files) => {
    const newImages = Array.from(files).map((file) => ({
      imageFile: file,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* =========================
     Submit
     ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFiles = [];
    const existedImage = [];

    images.forEach((img) => {
      if (img.id) existedImage.push(img.id);
      if (img.imageFile) {
        imageFiles.push(img.imageFile);
      }
    });

    formData.append(
      "product",
      new Blob(
        [
          JSON.stringify({
            nameEn: form.nameEn,
            nameVi: form.nameVi,
            brandId: form.brandId,
            price: Number(form.price),
            categoryList: selectedCategories,
            imageList: existedImage,
          }),
        ],
        { type: "application/json" }
      )
    );

    imageFiles.forEach((file) => {
      formData.append("productImages", file);
    });

    if (isEditMode) {
      await managementApi.updateProduct(product.id, formData);
    } else {
      await managementApi.createProduct(formData);
    }

    navigate({ to: "/products" });
  };

  /* =========================
     Render
     ========================= */
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Product info */}
      <div className="space-y-4 rounded border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-600">{isEditMode ? "Edit Product" : "Create Product"}</h2>

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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-500">Brand</label>
            <select
              value={form.brandId}
              onChange={(e) => updateForm("brandId", e.target.value)}
              className="mt-1 w-full cursor-pointer rounded border px-3 py-2 text-gray-500"
              required>
              <option value="">Select brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.brandName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Price</label>
            <input
              type="text"
              inputMode="numeric"
              value={formatPrice(form.price)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");

                updateForm("price", rawValue === "" ? "" : Number(rawValue));
              }}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4 rounded border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-600">Categories</h2>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const selected = selectedCategories.includes(c.id);
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => (selected ? removeCategory(c.id) : addCategory(c.id))}
                className={`cursor-pointer rounded border px-3 py-1 text-sm ${
                  selected ? "bg-indigo-500 text-white hover:bg-indigo-600" : "bg-white text-gray-600 hover:bg-gray-100"
                }`}>
                {lang === "vi" ? c.nameVi : c.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Images */}
      <div className="space-y-4 rounded border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-600">Product Images</h2>

          <label className="cursor-pointer rounded bg-indigo-500 px-3 py-1 text-sm text-white hover:bg-indigo-600">
            + Add Images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => addImages(e.target.files)}
              className="hidden"
            />
          </label>
        </div>

        {images.length === 0 && <p className="text-sm text-gray-500">No images added</p>}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img, index) => {
            const preview = img.imageFile ? URL.createObjectURL(img.imageFile) : img.imageLink;

            return (
              <div key={img.id ?? index} className="relative rounded border p-2">
                {preview ? (
                  <img src={preview} className="h-32 w-full object-contain" />
                ) : (
                  <div className="flex h-32 items-center justify-center text-sm text-gray-400">No image</div>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 cursor-pointer text-xs text-red-600">
                  <CloseIcon fontSize="small" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 border-t bg-gray-50 px-6 py-4">
        <button
          type="button"
          onClick={() => navigate({ to: "/products" })}
          className="cursor-pointer rounded-lg border bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Cancel
        </button>

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-indigo-500 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-600">
          {isEditMode ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}
