'use client';

import React from 'react';
import styles from './styles.module.scss';
import MenuIcon from '../../../public/svgs/menuIcon';
import { Tab } from '@/assets/types';
import Search from '../search';
import Button from '../button';
import useBoolean from '@/hooks/useBoolean';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../languageSwitcher';
import SignInCom from '@/components/signInCom';
import useWindowSize from '@/hooks/useWindowSize';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  const t = useTranslations('Words');
  const { isMd } = useWindowSize();
  const { state, setFalse, setToggle } = useBoolean();

  const onMouseLeave = () => {
    if (state) setFalse();
  };

  const tab: Array<Tab> = [
    { title: t('main'), url: `/`, active: lastSegment === "hy" || lastSegment === "ru" || lastSegment === "en" },
    { title: t('my_orders'), url: `/my_orders`, active: lastSegment === "my_orders" },
    { title: t('about'), url: `/about`, active: lastSegment === "about" }
  ];

  return (
    <header className={styles.container}>
      <Link href={`/`}>AirScreen</Link>
      <nav onMouseLeave={onMouseLeave}>
        <Button className={styles.menuIcon} onClick={setToggle}>
          <MenuIcon color={state ? '#0ae30d' : 'white'} />
        </Button>
        <ul className={state ? styles.isOpen : ''}>
          {isMd && <SignInCom />}
          {isMd && <Search />}
          {tab.map((val: Tab) => {
            return (
              <li key={val.title} className={val.active ? styles.active : ""}>
                <Link href={val.url}>{val.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.leftPart}>
        {!isMd && <Search />}
        <LanguageSwitcher />
        {!isMd && <SignInCom />}
      </div>
    </header>
  );
};

export default Header;
