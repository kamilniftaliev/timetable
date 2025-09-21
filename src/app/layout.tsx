import {
  DarkThemeToggle,
  ThemeModeScript,
  ThemeProvider,
} from "flowbite-react";
import type { Metadata } from "next";
import "./globals.css";
import { type ReactNode } from "react";
import { cn } from "@/utils";
import { TITLE } from "@/constants";

export const metadata: Metadata = {
  title: TITLE,
  description: TITLE,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="az" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5LN9DBMH51"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-5LN9DBMH51');
            `,
          }}
        />
        <ThemeModeScript />
        <link rel="icon" type="image/png" href="/icon-192.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </head>
      <body
        className={cn(
          "bg-white p-4 antialiased md:p-8 dark:bg-gray-900 dark:text-white",
        )}
      >
        <ThemeProvider>
          <DarkThemeToggle className="absolute top-3 right-1 md:top-8 md:right-4" />
          <main className="overflow-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
