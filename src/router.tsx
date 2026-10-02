import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultViewTransition: true,
    defaultPendingMs: 0,
    defaultPendingMinMs: 350,
    defaultPendingComponent: RouteLoadingIndicator,
  });

  return router;
};

function RouteLoadingIndicator() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center pt-20" aria-label="Loading">
      <span className="route-loading-spinner" aria-hidden />
    </main>
  );
}
