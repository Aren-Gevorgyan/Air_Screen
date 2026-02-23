import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import Moon from '@/components/moon';

const About = () => {
  const t = useTranslations('About');

  return (
    <div className={styles.container}>
      <Moon />
      <h1>📽️ {t('title')}</h1>
      <div className={styles.content}>
        <p>{t('description')}</p>
        <p>{t('text1')}</p>
        <p>{t('text2')}</p>

        <h2>🌲 1. {t('text3')}</h2>
        <ul>
          <li>{t('text4')}</li>
          <li>{t('text5')}</li>
          <li>{t('text6')}</li>
        </ul>

        <h2>🎬 2. {t('text7')}</h2>
        <ul>
          <li>✅ {t('text8')}</li>
          <li>✅ {t('text9')}</li>
          <li>✅ {t('text10')}</li>
        </ul>

        <h2>🚗 3. {t('text11')}</h2>
        <p>{t('text12')}</p>

        <h2>🍿 4. {t('text13')}</h2>
        <ul>
          <li>✅ {t('text14')}</li>
          <li>✅ {t('text15')}</li>
          <li>✅ {t('text16')}</li>
        </ul>
        <br />
        <p>{t('text17')}</p>
        <p>{t('text18')}</p>
        <p>📍 {t('text19')}</p>
      </div>
    </div>
  );
};

export default About;
