import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Providers from "./Providers";


export const metadata: Metadata = {
  title: "Wign",
  description: "web app for reading novels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}>
        <Providers>
          {children}
          <Analytics/>
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
