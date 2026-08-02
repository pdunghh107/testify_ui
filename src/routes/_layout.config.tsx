import { createFileRoute } from "@tanstack/react-router";
import { ConfigPage } from "../features/config/components/ConfigPage";

export const Route = createFileRoute("/_layout/config")({
  component: ConfigPage,
});
