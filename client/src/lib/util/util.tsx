import { DateArg, format, formatDistanceToNow, parseISO } from "date-fns";
import z from "zod";

export default function formatDate(date: string | Date) {
    const dateObj = typeof date === "string" ? parseISO(date) : date;
    return format(dateObj, "dd MMM yyyy h:mm a");
}

export function timeAgo(date: string | DateArg<Date>) {
    const parsed = typeof date === "string" ? parseISO(date) : date;
    return formatDistanceToNow(parsed, { addSuffix: true });
}

export const requiredString = (fieldName: string) => z.string().min(1, { message: `${fieldName} is required` });
