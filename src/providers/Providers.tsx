"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { HijriDateProvider } from "./HijriDateProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <NextUIProvider>
          <HijriDateProvider>{children}</HijriDateProvider>
        </NextUIProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
