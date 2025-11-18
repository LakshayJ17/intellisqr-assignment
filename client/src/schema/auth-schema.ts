import { z } from "zod"

export const AuthSchema = z.object({
    email: z.email("Email is required"),
    password: z.string().min(6, "Password must be of atleast 6 lengths").max(20, "Password must be at most 20 characters ")
})

export type AuthInput = z.infer<typeof AuthSchema>