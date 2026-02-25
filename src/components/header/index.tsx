'use client';

import styles from './styles.module.scss';
import MenuIcon from '../../../public/svgs/menuIcon';
import { Tab } from '@/assets/types';
import Search from '../search';
import Button from '../button';
import useBoolean from '@/hooks/useBoolean';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../languageSwitcher';
import useWindowSize from '@/hooks/useWindowSize';
import { Link } from '@/i18n/navigation';
import { usePathname } from 'next/navigation';
import Logo from '../../../public/svgs/logo';
import { useEffect, useState } from 'react';

const Header = () => {
  const pathname = usePathname();
  const lastSegment = pathname.split('/').pop();
  const t = useTranslations('Words');
  const { isMd } = useWindowSize();
  const { state, setFalse, setToggle } = useBoolean();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncRole = () => {
      setIsAdmin(window.localStorage.getItem('air_screen_role') === 'admin');
    };

    syncRole();
    window.addEventListener('storage', syncRole);

    return () => {
      window.removeEventListener('storage', syncRole);
    };
  }, []);

  const onMouseLeave = () => {
    if (state) setFalse();
  };

  const tab: Array<Tab> = [
    {
      title: t('main'),
      url: `/`,
      active:
        lastSegment === 'hy' || lastSegment === 'ru' || lastSegment === 'en',
    },
    {
      title: t('my_orders'),
      url: `/my_orders`,
      active: lastSegment === 'my_orders',
    },
    { title: t('saved'), url: `/saved`, active: lastSegment === 'saved' },
    { title: t('about'), url: `/about`, active: lastSegment === 'about' },
  ];

  if (isAdmin) {
    tab.splice(1, 0, {
      title: t('admin_tickets_nav'),
      url: '/admin_tickets',
      active: lastSegment === 'admin_tickets',
    });
  }

  return (
    <header className={styles.container}>
      <Link href={`/`}>
        <Logo /> <span>AirScreen</span>
      </Link>
      <nav onMouseLeave={onMouseLeave}>
        <Button className={styles.menuIcon} onClick={setToggle}>
          <MenuIcon color={state ? '#0ae30d' : 'white'} />
        </Button>
        <ul className={state ? styles.isOpen : ''}>
          {isMd && <Search />}
          {tab.map((val: Tab) => {
            return (
              <li
                onClick={setFalse}
                key={val.title}
                className={val.active ? styles.active : ''}
              >
                <Link href={val.url}>{val.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.rightPart}>
        {!isMd && (
          <div className={styles.searchContainer}>
            <Search />
          </div>
        )}
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
