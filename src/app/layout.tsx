import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const instrument = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });

/* Runs before the first paint. It marks the page as scripted (`html.js`), which
   is what lets the stylesheet hide the elements that will be revealed on
   scroll: without JavaScript nothing is ever hidden.

   It also sets the theme. A choice made with the toggle wins and is remembered;
   otherwise the site follows the visitor's device, and keeps following it if
   the device switches while the page is open. Light is the default. */
const themeScript = `(function(){var d=document.documentElement;d.classList.add("js");function saved(){try{var t=localStorage.getItem("theme");return t==="light"||t==="dark"?t:null}catch(e){return null}}var m=window.matchMedia("(prefers-color-scheme: dark)");d.dataset.theme=saved()||(m.matches?"dark":"light");if(m.addEventListener)m.addEventListener("change",function(e){if(!saved())d.dataset.theme=e.matches?"dark":"light"})})()`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}, ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: `${site.name}, ${site.role}`, description: site.description, siteName: site.name, type: "website", images: [{ url: "/work/gioco-news/00-hero.jpg" }] },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c11" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${instrument.variable} antialiased`} suppressHydrationWarning>
      <body id="top" className="min-h-dvh">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
