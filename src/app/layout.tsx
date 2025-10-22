import { Footer } from '../components/layout/Footer/Footer';

import type { Metadata } from "next";
import "../styles/app.scss";
import { AuthProvider } from '@/contexts/AuthContext';

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
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
