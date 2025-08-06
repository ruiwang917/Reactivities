import { format } from "date-fns";

export default function formatDate(date: Date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return format(dateObj, "dd MMM yyyy h:mm a");
}
