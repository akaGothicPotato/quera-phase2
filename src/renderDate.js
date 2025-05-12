// renderDate.js
export function renderDateToElements(formattedDate) {
  const date = document.getElementById("date");
  const date1 = document.getElementById("date1");

  if (date) date.textContent = formattedDate;
  if (date1) date1.textContent = `امروز، ${formattedDate}`;
}
