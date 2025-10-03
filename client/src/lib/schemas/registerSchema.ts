import z from "zod";
import { requiredString } from "../util/util";

export const registerSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    displayName: requiredString("Display Name"),
    password: requiredString("Password"),
});

export type registerSchema = z.infer<typeof registerSchema>;
