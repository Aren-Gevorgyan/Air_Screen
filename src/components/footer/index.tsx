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
      <div className={styles.content}>
        <div className={styles.logo}>
          <Link href={`/`}>
            <Logo />
            AirScreen
          </Link>
          <p>{t('descTwo')} 🌟</p>
          <p>AirScreen — {t('descThree')}</p>
        </div>
        <div className={styles.moreInfo}>
          <Link className={styles.link} href={`/privacy-policy`}>
            {t('privacy_policy')}
          </Link>
          <Link className={styles.link} href={`/about`}>
            {t('about')}
          </Link>
          <div className={styles.contact}>
            <div>
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
                {/* {t('phone')} */}
              </h6>
              <div>
                <a href="tel:+37494033456">+374 41 033456</a>
                <a href="tel:+37494033456">+374 94 033456</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span>© 2025 AirScreen</span>
    </footer>
  );
};

export default Footer;
