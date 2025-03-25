import React from 'react';
import styles from './styles.module.scss';
import {
  FaPhone,
  FaInstagram,
  FaTelegram,
  FaFacebook,
  FaEnvelope,
} from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const Footer = () => {
  const t = useTranslations('Words');

  return (
    <footer className={styles.container}>
      <div className={styles.logo}>
        <Link href={`/`}>AirScreen</Link>
        <p>{t('descTwo')} 🌟</p>
        <p>AirScreen — {t('descThree')}</p>
      </div>
      <div className={styles.contact}>
        <Link href="/" className={styles.networks}>
          <h6>
            <FaInstagram size={16} color="white" />
            Instagram
          </h6>
          <span>AirScreen</span>
        </Link>
        <Link href="/" className={styles.networks}>
          <h6>
            <FaFacebook size={16} color="white" />
            Facebook
          </h6>
          <span>AirScreen</span>
        </Link>
        <Link href="/" className={styles.networks}>
          <h6>
            <FaTelegram size={16} color="white" />
            Telegram
          </h6>
          <span>AirScreen</span>
        </Link>
        <Link href="/" className={styles.networks}>
          <h6>
            <FaEnvelope size={16} color="white" />
            Email
          </h6>
          <span>airScreen@gmail.com</span>
        </Link>
      </div>
      <div className={styles.moreInfo}>
        <Link className={styles.link} href={`/privacy-policy`}>
          {t('privacy_policy')}
        </Link>
        <Link className={styles.link} href={`/about`}>
          {t('about')}
        </Link>
        <div className={styles.phone}>
          <h6>
            <FaPhone size={16} color="white" />
            {t('phone')}
          </h6>
          <div>
            <span>041033456</span>
            <span>094033456</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
