import React, { FC } from 'react';
import styles from './styles.module.scss';
import Moon from '@/components/moon';
import { getMainPageData } from '@/requests/ssr';
import Genre from '@/pages/main/genre';
import Popular from '@/pages/main/poplare';

// import { getTranslations } from 'next-intl/server';

// type PropsMeta = {
//   params: Promise<{ locale: string }>
// }

// export const generateMetadata = async ({ params }: PropsMeta) => {
//   const { locale } = await params;
//   const t = await getTranslations({ locale, namespace: 'Words' });

//   return {
//     title: 'AirScreen',
//     description: t('descTwo'),
//     keywords: ["next.js", "react", "SEO", "web development"],
//     authors: [{ name: "Aren Gevorgyan", url: "https://air-scrren.com" }],
//     applicationName: "AirScreen",
//     generator: "Next.js",
//     themeColor: "#ffffff",
//     viewport: "width=device-width, initial-scale=1",
//     creator: "Aren Gevorgyan",
//     publisher: "AirScreen",
//     icons: "/favicon.ico",
//     openGraph: {
//       title: 'AirScreen',
//       description: t('descTwo'),
//       url: "https://screen.com",
//       siteName: "AirScreen",
//       images: [
//         {
//           url: "/og-image.png",
//           width: 1200,
//           height: 630,
//           alt: "AirScreen Popular image",
//         },
//       ],
//       locale,
//       type: "website",
//     },
//     alternates: {
//       canonical: "https://air-screen.com",
//       languages: {
//         en: "https://air-screen.com/en",
//         ru: "https://air-screen.com/ru",
//         hy: "https://air-screen.com/hy",
//       },
//     },
//   };
// }

type Props = {
  searchParams: Promise<{ genre: string }>;
};

const Home: FC<Props> = async ({ searchParams }) => {
  const genre = (await searchParams).genre;
  const data = await getMainPageData(genre);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Moon />
        <main>
          <Popular data={data} />
          <Genre genres={data.genres} genresByIdData={data.genresByIdData} />
        </main>
      </div>
    </div>
  );
};

export default Home;
