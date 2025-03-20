import React from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';
import { FaPhone, FaInstagram, FaTelegram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.logo}>
                <Link href="/">AirScreen</Link>
                <p>Միայն ֆիլմեր մի դիտեք, զգացեք դրանք։ 🌟</p>
                <p>AirScreen — որտեղ երկինքը սահման չունի</p>
            </div>
            <div className={styles.contact}>
                <Link href="/" className={styles.networks}>
                    <h6><FaInstagram size={16} color="white" />Instagram</h6>
                    <span>AirScreen</span>
                </Link >
                <Link href="/" className={styles.networks}>
                    <h6><FaFacebook size={16} color="white" />Facebook</h6>
                    <span>AirScreen</span>
                </Link>
                <Link href="/" className={styles.networks}>
                    <h6><FaTelegram size={16} color="white" />Telegram</h6>
                    <span>AirScreen</span>
                </Link>
                <Link href="/" className={styles.networks}>
                    <h6><FaEnvelope size={16} color="white" />Email</h6>
                    <span>airScreen@gmail.com</span>
                </Link>
            </div>
            <div className={styles.moreInfo}>
                <Link className={styles.link} href='/privacy-policy'>Privacy policy</Link>
                <div className={styles.phone}>
                    <h6><FaPhone size={16} color="white" />Phone</h6>
                    <div>
                        <span>041033456</span>
                        <span>094033456</span>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer;