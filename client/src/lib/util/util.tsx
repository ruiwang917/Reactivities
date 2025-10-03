import { format } from "date-fns";
import z from "zod";

export default function formatDate(date: Date) {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    return format(dateObj, "dd MMM yyyy h:mm a");
}

export const requiredString = (filedName: string) => z.string().min(1, { message: `${filedName} is required` });
