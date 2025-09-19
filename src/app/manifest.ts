import type { MetadataRoute } from "next";

import { TITLE } from "@/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Məktəb Cədvəli",
    short_name: "Məktəb Cədvəli",
    description: TITLE,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
