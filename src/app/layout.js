import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProjectProvider } from "./script/Projectcontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Caffetest - To do all your manual work in testing",
  description: "This is complete auto generated manual tech stack",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProjectProvider>{children}</ProjectProvider>
      </body>
    </html>
  );
}
