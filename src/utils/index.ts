export const formatDate = (
  dateString: string
): { fulldate: string; monthAndTime: string; formattedTime: string } => {
  const date = new Date(dateString);

  const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getFullYear()).slice(-2)}`;

  const month = date.toLocaleString("en-US", { month: "short" });
  let hours = date.getHours();
  
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const formattedTime = `${hours} ${period}`;
  const monthAndTime = `${month} ${formattedTime}`;

  return {
    fulldate: formattedDate,
    formattedTime: formattedTime,
    monthAndTime: monthAndTime,
  };
};
