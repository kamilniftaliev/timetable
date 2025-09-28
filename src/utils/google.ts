import { APP_VERSION, GTAG_ID } from "@/constants";

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event",
      targetId: string,
      config?: { [key: string]: any },
    ) => void;
  }
}

// Log the pageview with the app_version
export const pageView = (url: string) => {
  if (typeof window.gtag !== "function") {
    return;
  }
  window.gtag("config", GTAG_ID, {
    page_path: url,
    app_version: APP_VERSION,
  });
};

// Define a type for GA event parameters
type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};

// Log a specific event with the app_version
export const event = ({ action, category, label, value }: GTagEvent) => {
  if (typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    app_version: APP_VERSION,
  });
};
