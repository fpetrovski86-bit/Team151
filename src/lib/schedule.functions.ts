import { createServerFn } from "@tanstack/react-start";

const SCHEDULE_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRMjZBrmZWz1FBdc9ShjQFClqud22zcjnP95bxklbOE66MzPuCtxXlrl2nCIDxdOTEmjfWRsX3wlyKj/pub?gid=0&single=true&output=csv";

export type ScheduleLang = "mk" | "en";

export type ScheduleEvent = {
  id: string;
  naslov: string;
  datum: string;
  vreme: string;
  den: string;
  opis: string;
  slika: string;
};

export type ScheduleData = Record<ScheduleLang, ScheduleEvent[]>;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
      continue;
    }
    if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") field += c;
  }
  row.push(field);
  rows.push(row);
  return rows.filter((r) => r.some((v) => v.trim() !== ""));
}

function formatTime(value: string): string {
  const raw = value.trim();
  if (/^\d{1,2}$/.test(raw)) return `${raw.padStart(2, "0")}:00`;
  return raw;
}

async function fetchAll(): Promise<ScheduleData> {
  const empty: ScheduleData = { mk: [], en: [] };
  try {
    const res = await fetch(SCHEDULE_URL, { headers: { accept: "text/csv" } });
    if (!res.ok) return empty;
    const rows = parseCsv(await res.text());
    if (rows.length < 2) return empty;

    const header = rows[0]!.map((h) => h.trim().toLowerCase());
    const get = (row: string[], ...names: string[]) => {
      for (const n of names) {
        const i = header.indexOf(n);
        if (i >= 0) return (row[i] ?? "").trim();
      }
      return "";
    };

    const build = (lang: ScheduleLang): ScheduleEvent[] =>
      rows
        .slice(1)
        .map((row, index) => ({
          id: String(index + 1),
          naslov: get(row, `naslov_${lang}`, "naslov"),
          datum: get(row, `datum_${lang}`, "datum"),
          vreme: formatTime(get(row, `vreme_${lang}`, "vreme")),
          den: get(row, `den_${lang}`, "den"),
          opis: get(row, `opis_${lang}`, "opis"),
          slika: get(row, `slika_${lang}`, "slika"),
        }))
        .filter((e) => e.naslov || e.datum);

    return { mk: build("mk"), en: build("en") };
  } catch {
    return empty;
  }
}

export const getSchedule = createServerFn({ method: "GET" }).handler(
  async (): Promise<ScheduleData> => fetchAll(),
);
