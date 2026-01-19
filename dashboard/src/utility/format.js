export const formatPrice = (value) => new Intl.NumberFormat("vi-VN").format(value);

export const extractDate = (dateString, format = "en-US") => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(format, options);
};
