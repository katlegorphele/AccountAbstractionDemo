import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { ThirdwebProvider } from "thirdweb/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Account Abstraction Demo",
  description: "AA Demo",
};

export default function RootLayout({ children }) {
  return (
    <ThirdwebProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        <main>{children}</main>
      </body>
    </html>
    </ThirdwebProvider>
  );
}
