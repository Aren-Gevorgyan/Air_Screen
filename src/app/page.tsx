import React, { FC } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Moon from '@/components/moon';
import MyCarousel from '@/components/carousel';
import { getMainPageData } from '@/requests/ssr';
import Genre from '@/pages/main/genre';

type Props = {
  searchParams: { [key: string]: string }
}

const Home: FC<Props> = async ({ searchParams }) => {
  const data = await getMainPageData(searchParams.genre);

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
              <Image priority src="/images/pngegg.png" alt="AirScreen hero" fill />
              <Image src="/images/heroThree.png" alt="AirScreen hero" fill />
            </div>
          </div>
          <div className={styles.films}>
            <h2 className={styles.popular}>Հանրաճանաչ</h2>
            <MyCarousel data={data.popular} />
          </div>
          <Genre genres={data.genres} genresByIdData={data.genresByIdData} />
        </main>
      </div>
    </div>
  );
};

export default Home;
