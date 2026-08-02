import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider, MutationCache, QueryCache } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { routeTree } from "./routeTree.gen";
import { GlobalStyle } from "./styles/globalStyles";
import { getErrorMessage } from "./utils/error";
import { NotFound } from "./components/layout/NotFound";
import { ConfirmProvider } from "./contexts/ConfirmProvider";

const router = createRouter({ 
  routeTree,
  defaultNotFoundComponent: () => <NotFound />
});
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.disableGlobalError) return;
      toast.error(getErrorMessage(error));
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data: any, _variables, _context, mutation) => {
      if (mutation.meta?.disableGlobalSuccess) return;
      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage as string);
      } else if (data?.message) {
        toast.success(data.message);
      } else if (data?.data?.message) {
        toast.success(data.data.message);
      } else {
        toast.success("Thành công!");
      }
    },
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.disableGlobalError) return;
      toast.error(getErrorMessage(error));
    },
  }),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ConfirmProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
