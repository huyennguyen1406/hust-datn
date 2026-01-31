import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDeliveryInfo, getDistrictsByProvince, getProvinces, upsertDeliveryInfo } from "../../../api/userAccountApi";

const Deliver = () => {
  // =====================
  // Refs
  // =====================
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const provinceRef = useRef(null);
  const districtRef = useRef(null);
  const postalCodeRef = useRef(null);
  const countryRef = useRef(null);

  // Guard to prevent re-init
  const didInitRef = useRef(false);

  // =====================
  // Local state
  // =====================
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [postalCode, setPostalCode] = useState("");
  const [pendingDistrictId, setPendingDistrictId] = useState(null);

  const queryClient = useQueryClient();

  // =====================
  // Queries
  // =====================
  const { data: provinces = [] } = useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });

  const { data: districts = [] } = useQuery({
    queryKey: ["districts", selectedProvinceId],
    queryFn: () => getDistrictsByProvince(selectedProvinceId),
    enabled: !!selectedProvinceId,
  });

  const deliveryInfoQuery = useQuery({
    queryKey: ["delivery-info"],
    queryFn: getDeliveryInfo,
  });

  // =====================
  // Populate form ONCE from API
  // =====================
  useEffect(() => {
    if (didInitRef.current) return;
    if (!deliveryInfoQuery.data?.hasDeliveryInfo) return;
    if (!nameRef.current || !provinceRef.current) return;

    didInitRef.current = true;

    const d = deliveryInfoQuery.data.data;

    // Text inputs
    nameRef.current.value = d.deliverName ?? "";
    phoneRef.current.value = d.phoneNumber ?? "";
    emailRef.current.value = d.email ?? "";
    addressRef.current.value = d.address ?? "";
    countryRef.current.value = d.country ?? "Viet Nam";

    // 🔑 Province selected imperatively (same as district)
    provinceRef.current.value = d.provinceId;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedProvinceId(d.provinceId);
    setPostalCode(d.postalCode ?? "");
    setPendingDistrictId(d.districtId);
  }, [deliveryInfoQuery.data]);

  // =====================
  // Populate district AFTER districts load
  // =====================
  useEffect(() => {
    if (!pendingDistrictId) return;
    if (!districts.length) return;
    if (!districtRef.current) return;

    districtRef.current.value = pendingDistrictId;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPendingDistrictId(null);
  }, [districts, pendingDistrictId]);

  // =====================
  // Mutation
  // =====================
  const { mutate: saveDeliveryInfo, isLoading } = useMutation({
    mutationFn: upsertDeliveryInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delivery-info"] });
    },
  });

  // =====================
  // Handlers
  // =====================
  const onProvinceChange = (e) => {
    const provinceId = e.target.value || null;

    setSelectedProvinceId(provinceId);
    setPostalCode("");
    setPendingDistrictId(null);

    if (districtRef.current) {
      districtRef.current.value = "";
    }
  };

  const onDistrictChange = (e) => {
    const districtId = e.target.value;
    if (!districtId) {
      setPostalCode("");
      return;
    }

    setPostalCode(districtId.toString().padStart(6, "0"));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      deliverName: nameRef.current.value,
      phoneNumber: phoneRef.current.value,
      email: emailRef.current.value || null,
      address: addressRef.current.value,
      districtId: Number(districtRef.current.value),
      postalCode: postalCodeRef.current.value,
      country: countryRef.current.value,
    };

    saveDeliveryInfo(payload);
  };

  // =====================
  // Render
  // =====================
  return (
    <div className="bg-card rounded-xl p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold">Edit Delivery Information</h2>

      <form className="space-y-4" onSubmit={onSubmit}>
        {/* Name + Phone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input ref={nameRef} type="text" className="bg-background mt-1 block w-full rounded-lg border" />
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input ref={phoneRef} type="tel" className="bg-background mt-1 block w-full rounded-lg border" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>
          <input ref={emailRef} type="email" className="bg-background mt-1 block w-full rounded-lg border" />
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium">Address</label>
          <input ref={addressRef} type="text" className="bg-background mt-1 block w-full rounded-lg border" />
        </div>

        {/* Province + District */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Province</label>
            <select
              ref={provinceRef}
              onChange={onProvinceChange}
              className="bg-background mt-1 block w-full rounded-lg border">
              <option value="">Select province</option>
              {provinces.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nameVi}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">District</label>
            <select
              ref={districtRef}
              onChange={onDistrictChange}
              disabled={!selectedProvinceId}
              className="bg-background mt-1 block w-full rounded-lg border">
              <option value="">Select district</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nameVi}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Postal Code + Country */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Postal Code</label>
            <input
              ref={postalCodeRef}
              value={postalCode}
              readOnly
              className="bg-background mt-1 block w-full rounded-lg border"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Country</label>
            <input
              ref={countryRef}
              readOnly
              disabled
              defaultValue="Viet Nam"
              className="bg-background mt-1 block w-full rounded-lg border"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary h-12 rounded-lg px-5 font-bold text-white disabled:opacity-50">
            Save Delivery Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deliver;
