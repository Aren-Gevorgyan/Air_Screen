import React from 'react';
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
import { PropsMeta } from '@/assets/types';
import { Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs'
import GoUp from '@/components/goUp';
import { Toast } from '@/components/toast';
import aa from '../../../public/svgs/menuIcon'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#000000',
};

import Logo from '../../../public/svgs/logo';

export const generateMetadata = async ({ params }: PropsMeta) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Seo' });

  return {
    title: 'AirScreen',
    description: t('description'),
    authors: [{ name: "Aren Gevorgyan", url: "https://air-scrren.com" }],
    applicationName: "AirScreen",
    generator: "Next.js",
    creator: "Aren Gevorgyan",
    publisher: "AirScreen",
    // icons: "/favicon.ico",
    icons: {
      icon: '../../../public/svgs/logo',       // 🔄 updated favicon here
      shortcut: '../../../public/svgs/logo',   // optional
      apple: '../../../public/svgs/logo',      // for iOS bookmarks
    },
    alternates: {
      canonical: "https://air-screen.com",
      languages: {
        en: "https://air-screen.com/en",
        ru: "https://air-screen.com/ru",
        hy: "https://air-screen.com/hy",
      },
    },
    openGraph: {
      title: `${t('title')} 🌟`,
      description: t('description'),
      url: "https://screen.com",
      siteName: "AirScreen",
      images: [
        {
          url: 'https://i.pinimg.com/736x/20/61/3c/20613cc19a86ab791f2eab48ffe2ad0c.jpg',
          width: 1200,
          height: 630,
          alt: "AirScreen Popular image",
        },
      ],
      locale,
      type: "website",
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: 'en' | 'hy' | 'ru' }>;
};

const RootLayout = async ({ children, params }: Readonly<Props>) => {
  const lang = (await params).locale;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }
  const messages = await getMessages();
  return (
    <ClerkProvider>
      <html lang={lang}>
        <head>
          <link rel="icon" href="/icon.jpg" sizes="any" />
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              <div id="__next">
                <Header />
                <div className={styles.main}>
                  {children}
                  <GoUp />
                </div>
                <Footer />
              </div>
              <Toast />
            </NextIntlClientProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider >
  );
};

export default RootLayout;
