import {
  DarkThemeToggle,
  ThemeModeScript,
  ThemeProvider,
} from "flowbite-react";
import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { cn } from "@/utils";

export const metadata: Metadata = {
  title:
    "Xaçmaz şəhəri Akademik Zərifə Əliyeva adına 8 nömrəli təbiət təmayüllü lisey",
  description:
    "Xaçmaz şəhəri Akademik Zərifə Əliyeva adına 8 nömrəli təbiət təmayüllü lisey",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={cn(
          "bg-white p-4 antialiased md:p-8 dark:bg-gray-900 dark:text-white",
        )}
      >
        <ThemeProvider>
          <DarkThemeToggle className="absolute top-4 right-1 md:right-4" />
          <main className="overflow-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
