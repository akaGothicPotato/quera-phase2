// formatDate.js
export function getFormattedPersianDate() {
  const newDate = new Date();

  const parts = new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).formatToParts(newDate);

  const value = {
    year: parts.find((p) => p.type === "year")?.value,
    month: parts.find((p) => p.type === "month")?.value,
    day: parts.find((p) => p.type === "day")?.value,
    weekday: parts.find((p) => p.type === "weekday")?.value,
  };

  return `${value.weekday}، ${value.day} ${value.month} ${value.year}`;
}
