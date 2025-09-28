import {
  DarkThemeToggle,
  ThemeModeScript,
  ThemeProvider,
} from "flowbite-react";
import "./globals.css";
import { Suspense, type ReactNode } from "react";
import type { Viewport } from "next";
import { cn } from "@/utils";
import { Analytics } from "@/components";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="az" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
        <link rel="icon" type="image/jpeg" href="/horizontal-image.jpg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        <Suspense>
          <Analytics />
        </Suspense>
      </head>
      <body
        className={cn(
          "bg-white p-4 antialiased md:p-8 dark:bg-gray-900 dark:text-white print:p-2",
        )}
      >
        <ThemeProvider>
          <DarkThemeToggle className="absolute top-3 right-1 md:top-8 md:right-4 print:hidden" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
