import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { LoginForm } from "../features/auth/components/LoginForm";

const loginSearchSchema = z.object({
  redirect: z.string().optional().catch(""),
});

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  component: LoginForm,
});
