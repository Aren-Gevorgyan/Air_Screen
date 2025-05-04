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
import Logo from '../../../public/svgs/logo';

const Footer = () => {
  const t = useTranslations('Words');

  return (
    <footer className={styles.container}>
      <div className={styles.logo}>
        <Link href={`/`}>
          <Logo />
          AirScreen
        </Link>
        <p>{t('descTwo')} 🌟</p>
        <p>AirScreen — {t('descThree')}</p>
        <span>© 2025 AirScreen</span>
      </div>
      <div className={styles.moreInfo}>
        <Link className={styles.link} href={`/privacy-policy`}>
          {t('privacy_policy')}
        </Link>
        <Link className={styles.link} href={`/about`}>
          {t('about')}
        </Link>
        <div className={styles.contact}>
          <Link href="/" className={styles.networks}>
            <FaInstagram size={20} color="white" />
          </Link>
          <Link href="/" className={styles.networks}>
            <FaFacebook size={20} color="white" />
          </Link>
          <Link href="/" className={styles.networks}>
            <FaTelegram size={20} color="white" />
          </Link>
          <Link href="/" className={styles.networks}>
            <FaEnvelope size={20} color="white" />
          </Link>
        </div>
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
