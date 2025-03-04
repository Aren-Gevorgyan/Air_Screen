import Header from "@/components/header";
import styles from './styles.module.scss';
import Image from 'next/image';
import CarouselCom from '@/components/home/carusel';
import { BASE_URL } from "@/assets/constants";

const Home = async () => {
  const apiKey = process.env.TMDB_API_KEY;
  const url = `${BASE_URL}/popular?api_key=${apiKey}&language=en-US&page=1`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  console.log("TCL: CarouselCom -> data", data.results.length)

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.circle} >
          <div className={styles.smallCircle} />
        </div>
        <main>
          <div className={styles.top}>
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
                alt="AirScreen hero"
                fill
              />
              <Image
                src="/images/heroThree.png"
                alt="AirScreen hero"
                fill
              />
              <Image
                src="/images/heroTwo.png"
                alt="AirScreen hero"
                fill
              />
            </div>
          </div>
          <div className={styles.films}>
            <h2 className={styles.popular}>Հանրաճանաչ</h2>
            <CarouselCom data={data.results} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;