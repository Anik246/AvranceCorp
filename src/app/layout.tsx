import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AvranceCorp Developments | Building Quality Communities",
  description:
    "AvranceCorp Developments delivers exceptional residential and mixed-use developments across Canada and the United States.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "695x680", type: "image/png" },
    ],
    apple: { url: "/icon.png", sizes: "695x680", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
