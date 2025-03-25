'use client'

import React, { useCallback } from 'react';
import { languages } from '@/assets/constants';
import Button from '../button';
import styles from './styles.module.scss';
import { useParams, usePathname } from 'next/dist/client/components/navigation';
import { Languages } from '@/assets/types';
import useBoolean from '@/hooks/useBoolean';
// import { useRouter } from 'next/router';
import { useRouter } from '@/i18n/navigation';

const LanguageSwitcher = () => {
  const { replace } = useRouter();
  const { state, setToggle } = useBoolean();
  const params = useParams();
  const pathname = usePathname();
  const selectedItem = languages.find(
    (val: Languages) => val.country === params?.locale
  );

  const changeLanguage = (newLocale: string) => {
    replace(`/${pathname?.substring(3)}`, { locale: newLocale });
  };

  const onClick = useCallback((lng: string) => () => changeLanguage(lng), [pathname]);
  const selectedLng = (lng: Languages) => lng.country === params?.locale;

  return (
    <div className={styles.container}>
      <Button className={styles.flag} onClick={setToggle}>
        {selectedItem?.flag}
      </Button>
      {state && (
        <div className={styles.languages}>
          {languages.map((lng: Languages) => (
            <Button
              key={lng.country}
              onClick={onClick(lng.country)}
              className={selectedLng(lng) ? styles.active : styles.options}
              disabled={selectedLng(lng)}
            >
              {lng.country.toUpperCase()} {lng.flag}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
