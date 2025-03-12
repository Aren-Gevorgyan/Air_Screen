import React from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import { apiKey, BASE_URL } from '@/assets/constants';
import Moon from '@/components/moon';
import MyCarousel from '@/components/home/carousel';

const Home = async () => {
  const url = (page: number) =>
    `${BASE_URL}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

  const [firstPage, secondPage] = await Promise.all([
    fetch(url(1)),
    fetch(url(2)),
  ]);

  if (!firstPage.ok || !secondPage.ok) {
    throw new Error('Failed to fetch data');
  }

  const firstPageData = await firstPage.json();
  const secondPageData = await secondPage.json();
  const data = [...firstPageData.results, ...secondPageData.results];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Moon />
        <main>
          <div className={styles.top}>
            <div className={styles.about}>
              <h1>AirScreen եզակի բացօթյա կինոթատրոն</h1>
              <p>
                Մտեք մի աշխարհ, որտեղ մեծ էկրանը հանդիպում է գիշերային երկնքին
                AirScreen_ում՝ եզակի բացօթյա կինոթատրոնում: Հավաքեք սիրելիներիդ
                և վայելեք կինոյի մոգությունը, ինչպես երբեք։ Թե՛ ռոմանտիկ երեկո,
                թե՛ ընտանեկան հանգիստ կամ միայնակ պահեր, AirScreen_ինը անմոռաց
                պահեր է խոստանում աստղերի տակ։
              </p>
              <p>
                Միայն ֆիլմեր մի դիտեք, զգացեք դրանք։ 🌟 AirScreen — որտեղ
                երկինքը սահման չունի։
              </p>
            </div>
            <div className={styles.images}>
              <Image src="/images/pngegg.png" alt="AirScreen hero" fill />
              <Image src="/images/heroThree.png" alt="AirScreen hero" fill />
            </div>
          </div>
          <div className={styles.films}>
            <h2 className={styles.popular}>Հանրաճանաչ</h2>
            <MyCarousel data={data} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
