import { Outfit,  Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { AppWrapper } from '../components/context';

const nunito =  Nunito ({ subsets: ["latin"] });

export const metadata = {
  title: "Otaku Otoke",
};

export default function RootLayout({children}) {

  return (
    <html lang="en">
      <body className={nunito.className}>
      <AppWrapper>
        {children}
      </AppWrapper>
      </body>
    </html>
  );
}
