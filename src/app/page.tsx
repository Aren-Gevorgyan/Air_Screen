"use client"; // Ensures GSAP runs only on the client in Next.js App Router

import Header from "@/components/header";
import styles from './styles.module.scss';
import Image from 'next/image';

export async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store",
  });

  return res.json();
}

const Home = async () => {
  const data = await fetchData();
  console.log("TCL: Home -> data", data)
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.circle} >
          <div className={styles.smallCircle} />
        </div>
        <main>
          <div className={styles.about}>
            <h1>AirScreen եզակի բացօթյա կինոթատրոն</h1>
            <p>
              Մտեք մի աշխարհ, որտեղ մեծ էկրանը հանդիպում է գիշերային երկնքին  AirScreen_ում՝ եզակի բացօթյա կինոթատրոնում:
              Հավաքեք սիրելիներիդ և վայելեք կինոյի մոգությունը, ինչպես երբեք։ Թե՛ ռոմանտիկ երեկո, թե՛ ընտանեկան հանգիստ կամ միայնակ պահեր, AirScreen_ինը անմոռաց պահեր է խոստանում աստղերի տակ։
            </p>
            <p>
              Միայն ֆիլմեր մի դիտեք, զգացեք դրանք։ 🌟
              AirScreen — որտեղ երկինքը սահման չունի։
            </p>
          </div>
          <div className={styles.images}>
            <Image
              src="/images/hero.png"
              alt="Description of image"
              fill
            />
            <Image
              src="/images/heroThree.png"
              alt="Description of image"
              fill
            />
            <Image
              src="/images/heroTwo.png"
              alt="Description of image"
              fill
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;