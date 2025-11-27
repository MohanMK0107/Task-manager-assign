import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/Reduxprovider";
import { Sessionprovider } from "@/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Task app",
  description: "Your personal task manager",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Sessionprovider session={session}>
          <ReduxProvider>{children}</ReduxProvider>
        </Sessionprovider>
      </body>
    </html>
  );
}
