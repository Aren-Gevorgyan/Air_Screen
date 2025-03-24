'use client';

import React, { FC } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import MenuIcon from '../../../public/svgs/menuIcon';
import { Tab } from '@/assets/types';
import Search from '../search';
import Button from '../button';
import useBoolean from '@/hooks/useBoolean';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../languageSwitcher';
import SignInCom from '../../components/signInCom';
import useWindowSize from '@/hooks/useWindowSize';

type Props = {
  locale: "en" | "ru" | "hy"
}

const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('Words');
  const { isMd } = useWindowSize();
  const { state, setFalse, setToggle } = useBoolean();

  const onMouseLeave = () => {
    if (state) setFalse();
  };

  const tab: Array<Tab> = [{ title: t('main'), url: `/${locale}` }, { title: t('my_lists'), url: `/${locale}/my_lists` }, {
    title: t('about'), url: `/${locale}/about`
  }];

  return (
    <header className={styles.container}>
      <Link href={`/${locale}/`}>AirScreen</Link>
      <nav onMouseLeave={onMouseLeave}>
        <Button className={styles.menuIcon} onClick={setToggle}>
          <MenuIcon color={state ? '#0ae30d' : 'white'} />
        </Button>
        <ul className={state ? styles.isOpen : ''}>
          {isMd && <SignInCom />}
          {isMd && <Search />}
          {tab.map((val: Tab) => {
            return (
              <li key={val.title}>
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
