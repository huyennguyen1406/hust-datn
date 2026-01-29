import DeleteIcon from "@mui/icons-material/Delete";

export default function BannerForm({ index, banner, onChange, onRemove }) {
  const previewUrl = banner.imageFile ? URL.createObjectURL(banner.imageFile) : banner.imageLink;

  return (
    <div className="space-y-4 rounded border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-gray-700">Banner #{index + 1}</h4>

        <button
          type="button"
          onClick={() => onRemove(index)}
          className="cursor-pointer text-sm text-red-600 hover:underline">
          <DeleteIcon fontSize="small" />
        </button>
      </div>

      {/* Titles */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-600">Title (EN)</label>
          <input
            value={banner.titleEn || ""}
            onChange={(e) => onChange(index, "titleEn", e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Title (VI)</label>
          <input
            value={banner.titleVi || ""}
            onChange={(e) => onChange(index, "titleVi", e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-gray-500"
          />
        </div>
      </div>

      {/* Descriptions */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Description (EN)</label>
        <textarea
          rows={2}
          value={banner.descriptionEn || ""}
          onChange={(e) => onChange(index, "descriptionEn", e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Description (VI)</label>
        <textarea
          rows={2}
          value={banner.descriptionVi || ""}
          onChange={(e) => onChange(index, "descriptionVi", e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-gray-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600">Banner Image</label>

        <div className="flex items-center gap-4">
          <div className="flex h-24 w-40 items-center justify-center rounded border border-dashed bg-gray-50">
            {previewUrl ? (
              <img src={previewUrl} alt="Banner preview" className="h-full w-full object-contain" />
            ) : (
              <span className="text-sm text-gray-500">No image</span>
            )}
          </div>

          <label className="cursor-pointer text-sm font-medium text-indigo-600 hover:underline">
            Update Banner Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onChange(index, "imageFile", e.target.files?.[0])}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
