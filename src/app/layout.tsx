import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/main.scss';
import QueryProvider from '@/components/queryProvider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import styles from './styles.module.scss'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AirScreen',
  description: 'Միայն ֆիլմեր մի դիտեք, զգացեք դրանք։',
};

type Props = {
  children: React.ReactNode;
}

const RootLayout = ({
  children,
}: Readonly<Props>) => {
  return (
    <html lang={'en'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="__next">
          <Header />
          <div className={styles.main}>
            <QueryProvider>{children}</QueryProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
