import { queryOptions, useQuery } from "@tanstack/react-query";
import { getMenu } from "./menu.functions";
import { useLang } from "./i18n";

export const menuQueryOptions = queryOptions({
  queryKey: ["menu"],
  queryFn: () => getMenu(),
  staleTime: 60_000,
});

export function useMenu() {
  const { lang } = useLang();
  const { data, isLoading } = useQuery(menuQueryOptions);
  return { menu: data?.[lang] ?? [], isLoading };
}
