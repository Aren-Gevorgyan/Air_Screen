'use client';

import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import MenuIcon from '../../../public/svgs/menuIcon';
import { tabs } from '@/assets/constants';
import { Tab } from '@/assets/types';
import Search from '../search';
import Button from '../button';
import useBoolean from '@/hooks/useBoolean';

const Header = () => {
  const { state, setFalse, setToggle } = useBoolean();

  const onMouseLeave = () => {
    if (state) setFalse();
  }

  return (
    <header className={styles.container}>
      <Link href="/">AirScreen</Link>
      <nav onMouseLeave={onMouseLeave}>
        <Button className={styles.menuIcon} onClick={setToggle}>
          <MenuIcon color={state ? '#0ae30d' : 'white'} />
        </Button>
        <ul className={state ? styles.isOpen : ''}>
          <Search />
          {tabs.map((val: Tab) => {
            return (
              <li key={val.title}>
                <Link href={val.url}>{val.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.leftPart}>
        <Search />
        <Image
          src="/images/profile.png"
          alt="Description of image"
          width={30}
          height={30}
        />
      </div>
    </header>
  );
};

export default Header;
