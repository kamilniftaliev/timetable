import { DarkThemeToggle, ThemeModeScript } from "flowbite-react";
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
      <body className={cn("p-8")}>
        {/* <DarkThemeToggle className="absolute top-4 right-4" /> */}
        <main className="overflow-auto">{children}</main>
      </body>
    </html>
  );
}
