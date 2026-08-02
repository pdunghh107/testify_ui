import { createFileRoute } from "@tanstack/react-router";
import { RuleConfigPage } from "../features/config/components/RuleConfigPage";

export const Route = createFileRoute("/_layout/rule-configs")({
  component: RuleConfigPage,
});
