import { useMemo, useRef, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useMutation, useQuery } from "@tanstack/react-query";
import { simpleOrderApi } from "../../api/simpleOrderApi";
import { formatPrice } from "../../utility/format";

export default function CreateOrder() {
  const phoneRef = useRef(null);
  const productNameRef = useRef(null);

  const [userSearchKey, setUserSearchKey] = useState(0);
  const [quantities, setQuantities] = useState({});

  /* ================= USER QUERY ================= */
  const {
    data: user,
    isError: userNotFound,
    isFetching: isUserLoading,
  } = useQuery({
    queryKey: ["user-by-phone", userSearchKey],
    queryFn: () => simpleOrderApi.getUserByPhone(phoneRef.current.value),
    enabled: userSearchKey > 0,
    retry: false,
  });

  const handleSearchUser = () => {
    setUserSearchKey((k) => k + 1);
  };

  /* ================= PRODUCT QUERY ================= */
  const { data: products = [], refetch: refetchProducts } = useQuery({
    queryKey: ["product-details"],
    queryFn: () => simpleOrderApi.getProductDetails(productNameRef.current.value),
    enabled: false,
  });

  /* ================= TOTAL ================= */
  const totalPrice = useMemo(() => {
    return products.reduce((sum, p) => {
      const qty = quantities[p.productDetailId] || 0;
      return sum + qty * p.price;
    }, 0);
  }, [products, quantities]);

  /* ================= MUTATION ================= */
  const mutation = useMutation({
    mutationFn: simpleOrderApi.createOrder,
    onSuccess: async () => {
      await refetchProducts();
      setQuantities({});
    },
  });

  const handleAccept = () => {
    const orders = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([productDetailId, quantity]) => ({
        productDetailId,
        quantity,
      }));

    mutation.mutate({
      appUserId: user.id,
      orders,
    });
  };

  const getInitials = (u) => `${u.firstName?.[0] || ""}${u.lastName?.[0] || ""}`.toUpperCase();

  /* ================= RENDER ================= */
  return (
    <div className="mx-auto px-6 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ================= USER ================= */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">Find User By Phone Number</h2>

            <div className="mb-6 flex">
              <input
                ref={phoneRef}
                className="flex-1 rounded-l-md border px-4 py-2 text-gray-600"
                placeholder="Enter phone number..."
              />
              <button onClick={handleSearchUser} className="bg-primary cursor-pointer rounded-r-md px-5 text-white">
                Search
              </button>
            </div>

            {user && !userNotFound && !isUserLoading && (
              <div className="rounded-lg border bg-gray-50 p-5">
                <div className="mb-4 flex items-center gap-4">
                  <div className="text-primary flex h-16 w-16 items-center justify-center rounded-full border bg-linear-to-br from-purple-100 to-indigo-100 text-xl font-bold">
                    {getInitials(user)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {user.firstName} {user.lastName}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <EmailIcon fontSize="small" className="text-gray-400" />
                    {user.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <LocalPhoneIcon fontSize="small" className="text-gray-400" />
                    {user.phoneNumber}
                  </p>
                </div>
              </div>
            )}

            {userNotFound && <p className="mt-4 text-sm text-red-500">User not found</p>}
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="flex flex-col rounded-xl border bg-white shadow-sm lg:col-span-2">
          <div className="border-b p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">Product Details</h2>

            <div className="flex">
              <input
                ref={productNameRef}
                className="flex-1 rounded-l-md border px-4 py-3 text-gray-600"
                placeholder="Search product name..."
              />
              <button onClick={refetchProducts} className="bg-primary cursor-pointer rounded-r-md px-6 text-white">
                Search
              </button>
            </div>
          </div>

          <div className="grow space-y-4 p-6">
            {products.map((p) => (
              <div
                key={p.productDetailId}
                className="group flex flex-col items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md sm:flex-row">
                {/* IMAGE */}
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                  <img src={p.imageUrl} alt={p.productNameEn} className="h-full w-full object-cover" />
                </div>

                {/* INFO */}
                <div className="w-full grow text-center sm:text-left">
                  <div className="mb-1 flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{p.productNameEn}</h4>
                      <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{p.brandName}</p>
                    </div>

                    <p className="text-primary hidden font-semibold sm:block">{p.price.toLocaleString("vi-VN")} ₫</p>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600 sm:justify-start">
                    {/* SIZE */}
                    <div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1">
                      <span className="text-xs text-gray-500">Size:</span>
                      <span className="font-medium">{p.size}</span>
                    </div>

                    {/* COLOR */}
                    <div className="flex items-center gap-2 rounded bg-gray-100 px-2 py-1">
                      <span className="text-xs text-gray-500">Color:</span>
                      <span
                        className="block h-3 w-3 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: p.colorHexCode }}
                      />
                    </div>

                    {/* STOCK */}
                    <div
                      className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
                        p.quantity > 10 ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                      }`}>
                      {p.quantity} in stock
                    </div>
                  </div>

                  <p className="text-primary mt-2 font-semibold sm:hidden">{formatPrice(p.price)} ₫</p>
                </div>

                {/* QUANTITY CONTROL */}
                <div className="flex shrink-0 items-center overflow-hidden rounded-lg border border-gray-300">
                  <button
                    type="button"
                    className="px-3 py-2 text-gray-600 transition-colors hover:bg-gray-200"
                    onClick={() =>
                      setQuantities((prev) => ({
                        ...prev,
                        [p.productDetailId]: Math.max(0, (prev[p.productDetailId] || 0) - 1),
                      }))
                    }>
                    −
                  </button>

                  <input
                    type="number"
                    min={0}
                    max={p.quantity}
                    readOnly
                    className="h-full w-12 border-none bg-white py-2 text-center text-sm font-semibold text-gray-900 focus:ring-0"
                    value={quantities[p.productDetailId] || 0}
                  />

                  <button
                    type="button"
                    className="px-3 py-2 text-gray-600 transition-colors hover:bg-gray-200"
                    onClick={() =>
                      setQuantities((prev) => ({
                        ...prev,
                        [p.productDetailId]: Math.min(p.quantity, (prev[p.productDetailId] || 0) + 1),
                      }))
                    }>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {user && totalPrice > 0 && (
            <div className="border-t bg-gray-50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-3xl font-bold text-gray-900">{formatPrice(totalPrice)} ₫</p>
                </div>

                <button
                  onClick={handleAccept}
                  disabled={mutation.isLoading}
                  className="bg-primary cursor-pointer rounded-lg px-8 py-3 font-bold text-white disabled:opacity-50">
                  {mutation.isLoading ? "Processing..." : "Accept Order"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
