import Header from "@/components/header";
import Image from 'next/image';

import styles from './styles.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.circle} />
        <main>
          {/* <Image
            src="/images/background.png"
            alt="Description of image"
            width={500}
            height={500}
          /> */}
        </main>
      </div>
    </div>
  );
}

export default Home;