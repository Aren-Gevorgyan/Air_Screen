import React from "react";
import styles from './styles.module.scss';
import Link from "next/link";
import Image from 'next/image';
import MenuIcon from '../../../public/svgs/menuIcon';

type Tab = {
  title: string;
  url: string;
};

const tabs: Tab[] =  [
  {title: "HOME", url: '/'},
  {title: "MOVIES", url: '/movies'},
  {title: "SERIALS", url: '/serials'},
  {title: "MY LISTS", url: '/my_lists'}]

const Header = () => {
  return (
    <header className={styles.container}>
      <Link href='/'>AirScreen</Link>
      <nav>
        <MenuIcon />
        <ul>
          {
            tabs.map((val: Tab) => {
              return <li key={val.title}><Link href={val.url}>{val.title}</Link></li>;
            })
          }
        </ul>
      </nav>
      <Image
        src="/images/profile.png"
        alt="Description of image"
        width={30}
        height={30}
      />
    </header>
  );
};

export default Header;
