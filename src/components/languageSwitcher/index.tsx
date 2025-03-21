import React, { useCallback } from 'react';
import { languages } from '@/assets/constants';
import { useRouter } from 'next/navigation';
import Button from '../button';
import styles from './styles.module.scss';
import { useParams, usePathname } from 'next/dist/client/components/navigation';
import { Languages } from '@/assets/types';
import useBoolean from '@/hooks/useBoolean';

const LanguageSwitcher = () => {
    const { push } = useRouter();
    const { state, setToggle } = useBoolean();
    const params = useParams();
    const pathname = usePathname();
    const selectedItem = languages.find((val: Languages) => val.flag);

    const changeLanguage = (newLocale: string) => {
        pathname && push(`/${newLocale}${pathname.substring(3)}`);
    };

    const onClick = useCallback((lng: string) => () => changeLanguage(lng), []);

    return (
        <div className={styles.container}>
            <Button onClick={setToggle}>
                {selectedItem?.flag}
            </Button>
            {state &&
                <div className={styles.languages}>
                    {languages.map((lng: Languages) => (
                        <Button
                            key={lng.country}
                            onClick={onClick(lng.country)}
                            disabled={lng.country === params?.locale}
                        >
                            {lng.country.toUpperCase()}  {lng.flag}
                        </Button>
                    ))}
                </div>
            }
        </div>
    );
}

export default LanguageSwitcher;