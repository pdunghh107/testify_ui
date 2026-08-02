import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { RegisterForm } from "../features/auth/components/RegisterForm";

const registerSearchSchema = z.object({
  redirect: z.string().optional().catch(""),
});

export const Route = createFileRoute("/register")({
  validateSearch: registerSearchSchema,
  component: RegisterForm,
});
