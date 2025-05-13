import React from 'react';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import Moon from '@/components/moon';

const PrivacyPolicy = () => {
  const t = useTranslations('PrivacyPolicy');

  return (
    <div className={styles.container}>
      <Moon />
      <h1>{t('title')}</h1>
      <div className={styles.content}>
        <p>{t('description')}</p>

        <h2>1. {t('text1')}</h2>
        <ul>
          {/* <li>{t('text2')}՝</li> */}
          <li>{t('text3')}:</li>
          <li>{t('text4')}:</li>
        </ul>

        <h2>2. {t('text5')}</h2>
        <ul>
          {/* <li>{t('text6')}՝</li> */}
          <li>{t('text7')}:</li>
          <li>{t('text8')}:</li>
          <li>{t('text9')}:</li>
          <li>{t('text10')}:</li>
        </ul>

        <h2>3. {t('text11')}</h2>
        <ul>
          <li>{t('text12')}:</li>
          <li>{t('text13')}:</li>
        </ul>

        <h2>4. {t('text14')}</h2>
        <ul>
          <li>{t('text15')}:</li>
          <li>{t('text16')}:</li>
          <li>{t('text17')}:</li>
          <li>{t('text18')}:</li>
        </ul>

        <h2>5. {t('text23')}</h2>
        <ul>
          <li>{t('text24')}</li>
        </ul>

        <h2>6. {t('text19')}</h2>
        <ul>
          <li>{t('text20')}:</li>
          <li>{t('text21')}:</li>
        </ul>

        <p>{t('text22')}։</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
