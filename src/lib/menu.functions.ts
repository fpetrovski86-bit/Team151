import { createServerFn } from "@tanstack/react-start";
import { parseCsv } from "./schedule.functions";
import type { MenuCategory } from "./menu-data";

const CATEGORIES_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQT3vjiqAQXDh8QL2zI4OZh86YGmo8AolaxNe59ytl_wooE1nmljKvVEjmGg90Ssp6r15NxWW7T5qbg/pub?gid=0&single=true&output=csv";
const ITEMS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRczSZZS3RY0RkRQqzIwlL6pj4hvZug8VGWKd1Q6G6TPEKm24rtIP7FtGxKl_2QByEY9hVFhxCrHtip/pub?gid=0&single=true&output=csv";

type Row = { kategorija_ime: string; ime_mk: string; namirnici_mk: string; cena: string; slika: string; [k: string]: string };

export type MenuData = Record<"mk" | "en", MenuCategory[]>;

async function load(url: string) {
  const res = await fetch(url, { headers: { accept: "text/csv" } });
  if (!res.ok) throw new Error(`Menu fetch failed [${res.status}]`);
  const rows = parseCsv(await res.text());
  const header = rows[0]?.map((h) => h.trim().toLowerCase()) ?? [];
  return rows.slice(1).map((r) => {
    const o: Record<string, string> = {};
    header.forEach((h, i) => (o[h] = (r[i] ?? "").trim()));
    return o as Row;
  });
}

export const getMenu = createServerFn({ method: "GET" }).handler(async (): Promise<MenuData> => {
  try {
    const [cats, items] = await Promise.all([load(CATEGORIES_URL), load(ITEMS_URL)]);
    const build = (lang: "mk" | "en"): MenuCategory[] =>
      cats
        .filter((c) => c.kategorija_ime)
        .map((c) => ({
          id: c.kategorija_ime!,
          name: c[`ime_${lang}`] || c.ime_mk || "",
          items: items
            .filter((it) => it.kategorija_ime === c.kategorija_ime)
            .map((it) => ({
              name: it[`ime_${lang}`] || it.ime_mk || "",
              desc: (it[`namirnici_${lang}`] || it.namirnici_mk || "")
                .split(";")
                .map((s) => s.trim())
                .filter(Boolean)
                .join(", "),
              price: Number((it.cena || "0").replace(/[^\d.]/g, "")) || 0,
              img: it.slika || "",
            })),
        }));
    return { mk: build("mk"), en: build("en") };
  } catch (e) {
    console.error(e);
    return { mk: [], en: [] };
  }
});
