export const buildVoucherQueryParams = ({ page, pageSize, combination, filters }) => {
  const fields = [];
  const operations = [];
  const values = [];

  if (Array.isArray(filters)) {
    filters.forEach(({ field, operator, value }) => {
      if (!value || !value.trim()) return;

      fields.push(field);
      operations.push(operator);
      values.push(value);
    });
  }

  return {
    page,
    pageSize,
    combination,
    fields: fields.join(","),
    operations: operations.join(","),
    values: values.join(","),
  };
};
