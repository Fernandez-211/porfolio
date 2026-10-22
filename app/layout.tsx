import type { Metadata } from "next";
import "./globals.css";
import "./scene.css";

export const metadata: Metadata = {
  title: "TSARALAZA Narcisse Alicio Fernandez — Développeur web",
  description: "Portfolio personnel de TSARALAZA Narcisse Alicio Fernandez, développeur web à Antsiranana, Madagascar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
