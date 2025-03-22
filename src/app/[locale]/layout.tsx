import React from 'react';
// import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../../styles/main.scss';
import QueryProvider from '@/components/queryProvider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import styles from './styles.module.scss';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getMessages, getTranslations } from 'next-intl/server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

type PropsMeta = {
  params: Promise<{ locale: string }>
}

export const generateMetadata = async ({ params }: PropsMeta) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Words' });

  return {
    title: 'AirScreen1',
    description: t('descTwo'),
    keywords: ["next.js", "react", "SEO", "web development"],
    authors: [{ name: "Aren Gevorgyan2", url: "https://air-scrren.com" }],
    applicationName: "AirScreen",
    generator: "Next.js",
    themeColor: "#ffffff",
    viewport: "width=device-width, initial-scale=1",
    creator: "Aren Gevorgyan",
    publisher: "AirScreen1",
    icons: "/favicon.ico",
    alternates: {
      canonical: "https://air-screen1.com",
      languages: {
        en: "https://air-screen.com/en",
        ru: "https://air-screen.com/ru",
        hy: "https://air-screen.com/hy",
      },
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: 'en-US' | 'hy' }>;
};

const RootLayout = async ({ children, params }: Readonly<Props>) => {
  const lang = (await params).locale;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <div id="__next">
              <Header />
              <div className={styles.main}>{children}</div>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
