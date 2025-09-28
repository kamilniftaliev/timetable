// Define a type for GA event parameters
export type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number | string;
};

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
