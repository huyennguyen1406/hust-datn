import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { managementApi } from "../../api/managementApi";
import { useI18n } from "../../i18n/useI18n";
import { formatPrice } from "../../utility/format";
import ProductInfo from "./ProductInfo.jsx";

export default function ProductForm({
  mode, // "create" | "edit"
}) {
  const navigate = useNavigate();
  const isEditMode = mode === "edit";
  const loaderData = useLoaderData({ strict: false });
  const { brands, categories, product } = loaderData;
  const { lang } = useI18n();

  const productColors = isEditMode ? loaderData?.productColors : [];
  const initialProductInfoDetails = isEditMode ? loaderData?.productInfoDetails : [];

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

  const [productInfoDetails, setProductInfoDetails] = useState(
    initialProductInfoDetails.map((d) => ({
      productDetailId: d.productDetailId,
      colorId: d.colorId,
      colorCode: d.colorCode,
      size: d.size,
      quantity: d.quantity,
    }))
  );

  const [saveDetailSuccess, setStateDetailSuccess] = useState(false);

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
      tempId: crypto.randomUUID(),
      imageFile: file,
      preview: URL.createObjectURL(file),
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
  Product Info Details
  ========================= */
  const addRowDetail = () => {
    setProductInfoDetails((prev) => [
      ...prev,
      {
        productDetailId: null,
        colorId: "",
        size: "",
        quantity: 0,
      },
    ]);
  };

  const updateRowDetail = (index, field, value) => {
    setProductInfoDetails((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const removeRowDetail = (index) => {
    setProductInfoDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const queryClient = useQueryClient();

  const saveProductDetailMutation = useMutation({
    mutationFn: () =>
      managementApi.updateProductDetail(product.id, {
        dataList: productInfoDetails,
      }),
    onSuccess: () => {
      setStateDetailSuccess(true);

      // optional: refetch product detail if needed
      queryClient.invalidateQueries({
        queryKey: ["product-detail", product.id],
      });

      // auto hide success message
      setTimeout(() => setStateDetailSuccess(false), 3000);
    },
    onError: () => {
      setStateDetailSuccess(false);
    },
  });

  const saveProductDetail = () => {
    saveProductDetailMutation.mutate();
  };

  const isSaveDisabled =
    productInfoDetails.length === 0 || productInfoDetails.some((d) => !d.colorId || !d.size || d.quantity < 0);

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
      {/* Product Info Detail */}
      {isEditMode && (
        <div className="space-y-6 rounded border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Product Detail</h2>
              <p className="text-sm text-gray-500">Manage color, size and stock quantity</p>
            </div>

            <button
              type="button"
              onClick={addRowDetail}
              className="rounded bg-indigo-500 px-3 py-1 text-sm text-white hover:bg-indigo-600">
              + Add
            </button>
          </div>

          <ProductInfo
            rows={productInfoDetails}
            colors={productColors}
            onChange={updateRowDetail}
            onRemove={removeRowDetail}
          />

          <div className="flex justify-end border-t pt-4">
            {/* Status */}
            <div className="ml-3 text-sm">
              {saveProductDetailMutation.isPending && <span className="text-gray-500">Saving...</span>}

              {saveProductDetailMutation.isSuccess && saveDetailSuccess && (
                <span className="text-gray-900">✓ Product detail saved successfully</span>
              )}

              {saveProductDetailMutation.isError && <span className="text-red-600">Failed to save product detail</span>}
            </div>

            <button
              type="button"
              onClick={saveProductDetail}
              disabled={isSaveDisabled}
              className="cursor-pointer rounded bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50">
              {saveProductDetailMutation.isPending ? "Saving..." : "Save Product Detail"}
            </button>
          </div>
        </div>
      )}

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
          {images.map((img) => (
            <div key={img.id ?? img.tempId} className="relative rounded border p-2">
              {img.preview || img.imageLink ? (
                <img src={img.preview ?? img.imageLink} className="h-32 w-full object-contain" alt="Product" />
              ) : (
                <div className="flex h-32 items-center justify-center text-sm text-gray-400">No image</div>
              )}

              <button
                type="button"
                onClick={() => removeImage(images.findIndex((i) => (i.id ?? i.tempId) === (img.id ?? img.tempId)))}
                className="absolute top-1 right-1 cursor-pointer text-xs text-red-600">
                <CloseIcon fontSize="small" />
              </button>
            </div>
          ))}
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
