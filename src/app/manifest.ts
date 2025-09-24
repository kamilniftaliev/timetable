import type { MetadataRoute } from "next";

import { PAGE_DESCRIPTION } from "@/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Məktəb Cədvəli",
    short_name: "Məktəb Cədvəli",
    description: PAGE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/horizontal-image.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/horizontal-image.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
