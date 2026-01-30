import { useState } from "react";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { managementApi } from "../../api/managementApi";
import { formatPrice } from "../../utility/format";

export default function VoucherForm({ mode }) {
  const navigate = useNavigate();
  const isEditMode = mode === "edit";

  const loaderData = useLoaderData({ strict: false });
  const voucher = isEditMode ? loaderData : null;

  /* =========================
     State initialization
     ========================= */
  const [form, setForm] = useState(() => ({
    code: voucher?.code ?? "",
    startTime: voucher?.startTime ? voucher.startTime.slice(0, 16) : "",
    endTime: voucher?.endTime ? voucher.endTime.slice(0, 16) : "",
    discountAmount: voucher?.discountAmount ?? "",
    voucherAmount: voucher?.voucherAmount ?? "",
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
      code: form.code.trim(), // lấy từ form (edit: disabled)
      startTime: new Date(form.startTime).toISOString(),
      endTime: new Date(form.endTime).toISOString(),
      discountAmount: Number(form.discountAmount),
      voucherAmount: Number(form.voucherAmount),
    };

    await managementApi.createOrUpdateVoucher(payload);
    navigate({ to: "/vouchers" });
  };

  /* =========================
     Render
     ========================= */
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4 rounded border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-600">{isEditMode ? "Edit Voucher" : "Create Voucher"}</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Voucher Code</label>
            <input
              value={form.code}
              onChange={(e) => updateForm("code", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-600"
              required
              disabled={isEditMode} // 🔒 immutable
            />
          </div>

          {/* Discount Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Discount Amount</label>

            <input
              type="text"
              inputMode="numeric"
              value={formatPrice(form.discountAmount)}
              onChange={(e) => {
                // bỏ tất cả ký tự không phải số
                const rawValue = e.target.value.replace(/\D/g, "");

                updateForm("discountAmount", rawValue ? Number(rawValue) : "");
              }}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-600"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Start Time</label>
            <input
              type="datetime-local"
              value={form.startTime}
              onChange={(e) => updateForm("startTime", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-600"
              required
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-sm font-medium text-gray-600">End Time</label>
            <input
              type="datetime-local"
              value={form.endTime}
              onChange={(e) => updateForm("endTime", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-600"
              required
            />
          </div>

          {/* Voucher Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Voucher Amount</label>
            <input
              type="number"
              min={1}
              value={form.voucherAmount}
              onChange={(e) => updateForm("voucherAmount", e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-gray-600"
              required
            />
          </div>

          {/* Modified At – read only */}
          {voucher?.modifiedAt && (
            <div>
              <label className="block text-sm font-medium text-gray-600">Last Modified</label>
              <input
                type="text"
                value={new Date(voucher.modifiedAt).toLocaleString()}
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
          onClick={() => navigate({ to: "/vouchers" })}
          className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          {isEditMode ? "Update Voucher" : "Create Voucher"}
        </button>
      </div>
    </form>
  );
}
