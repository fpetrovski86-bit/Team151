import { queryOptions } from "@tanstack/react-query";
import { getSchedule } from "./schedule.functions";

type Lang = "mk" | "en";

export const scheduleQueryOptions = (lang: Lang = "mk") =>
  queryOptions({
    queryKey: ["schedule", lang],
    queryFn: () => getSchedule({ data: lang }),
    staleTime: 60_000,
  });

export type { ScheduleEvent } from "./schedule.functions";
