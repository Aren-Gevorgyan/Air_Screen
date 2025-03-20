import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../../styles/main.scss';
import QueryProvider from '@/components/queryProvider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import styles from './styles.module.scss'
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';

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
  params: Promise<{ locale: 'en-US' | 'hy' }>
}

const RootLayout = async ({
  children,
  params,
}: Readonly<Props>) => {
  const lang = (await params).locale;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="__next">
          <Header />
          <div className={styles.main}>
            <QueryProvider><NextIntlClientProvider>{children}</NextIntlClientProvider></QueryProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
