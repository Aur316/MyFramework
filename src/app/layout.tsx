import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CardProvider } from "../../frontend/store/useCardContext";
import { Sidebar } from "../../frontend/components/SideBar";
import Providers from "@/app/provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`}
      >
        <div>
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col">
          <Toaster position="top-right" richColors />
          <CardProvider>
            <Providers>{children}</Providers>
          </CardProvider>
        </div>
      </body>
    </html>
  );
}
