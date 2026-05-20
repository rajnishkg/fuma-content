import "./styles.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Fuma Content Comark Example",
  description: "Next.js example app for Fuma Content Comark collections.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
