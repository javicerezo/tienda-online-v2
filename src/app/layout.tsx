import { Footer } from '../components/layout/Footer/Footer';

import type { Metadata } from "next";
import "../styles/app.scss";


export const metadata: Metadata = {
  title: "Tienda de montaña",
  description: "Tienda online dedicada a los deportes de montaña",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
          {children}
          <Footer />
      </body>
    </html>
  );
}
