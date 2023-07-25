export const format_currency = (value?: string | number) => {
  if (!value) return "";
  if (typeof value === "string")
    value = Number(value.replace(/\./g, "").replace(/,/g, "."));
  return `${value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} kr.`;
};

export const format_score = (value?: string | number) => {
  if (!value) return "";
  if (typeof value === "string")
    value = Number(value.replace(/\./g, "").replace(/,/g, "."));
  return `${value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};
