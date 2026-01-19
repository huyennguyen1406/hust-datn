export const MOCK_DATA_PROVINCE = {
  columns: ["id", "province_name_en", "province_name_vi"],
  data: [
    { id: 1, province_name_en: "Hanoi", province_name_vi: "Hà Nội" },
    { id: 2, province_name_en: "Ho Chi Minh City", province_name_vi: "Thành phố Hồ Chí Minh" },
    { id: 3, province_name_en: "Da Nang", province_name_vi: "Đà Nẵng" },
    { id: 4, province_name_en: "Hai Phong", province_name_vi: "Hải Phòng" },
    { id: 5, province_name_en: "Can Tho", province_name_vi: "Cần Thơ" },
  ],
};

export const MOCK_DATA_PAYMENT_METHOD = {
  columns: ["id", "method_name_en", "method_name_vi", "description"],
  data: [
    {
      id: 1,
      method_name_en: "Direct payment on delivery",
      method_name_vi: "Thanh toán trực tiếp khi nhận hàng",
      description: "Thanh toán trực tiếp khi nhận hàng",
    },
    {
      id: 2,
      method_name_en: "Payment by QR Code",
      method_name_vi: "Thanh toán bằng mã QR",
      description: "Pay using PayPal account",
    },
  ],
};
