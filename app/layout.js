"use client";
import './globals.css';
import Navbar from '../src/components/Navbar';

export const metadata = {
  title: 'LinkVault',
  description: 'Personal link manager',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
