import { APP_VERSION, GTAG_ID } from "@/constants";
import { GTagEvent } from "@/types";

export function reportPageView(url: string) {
  if (typeof window.gtag !== "function") return;

  window.gtag("config", GTAG_ID, {
    page_path: url,
    app_version: APP_VERSION,
  });
}

export function reportAnalyticEvent({
  action,
  category,
  label,
  value,
}: GTagEvent) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
    app_version: APP_VERSION,
  });
}
