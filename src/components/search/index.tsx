'use client';

import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.scss';
import { InputParamter } from '@/assets/types';
import Button from '../button';
import useBoolean from '@/hooks/useBoolean';
import useWindowSize from '@/hooks/useWindowSize';
import { useRouter } from 'next/navigation';
import useQueryParam from '@/hooks/useQueryParam';
import { useParams } from 'next/dist/client/components/navigation';
import { useTranslations } from 'next-intl';

const Search = () => {
  const t = useTranslations('Words');
  const params = useParams();
  const { isMd } = useWindowSize();
  const { push } = useRouter();
  const filter = useQueryParam('value');
  const [value, setValue] = useState<string>('');
  const {
    state: isOpen,
    setTrue,
    setFalse,
    setToggle,
  } = useBoolean(isMd || !!filter);

  useEffect(() => {
    if (filter && 'null' !== filter) return setValue(filter);
    setValue('');
  }, [filter]);

  useEffect(() => {
    if (!filter) setFalse();
  }, [filter]);

  useEffect(() => {
    if (isMd) {
      setTrue();
    } else {
      if(!filter) setFalse();
    }
  }, [isMd, filter]);

  const onChange = (event: InputParamter) => {
    setValue(event.target.value);
    push(`/${params?.locale}/search?value=${event.target.value}`);
  };

  const onSearch = useCallback(
    (event: MouseEvent<HTMLButtonElement>): void => {
      event.stopPropagation();
      setToggle();
      if (filter && 'null' !== filter)
        push(`/${params?.locale}/search?value=${filter}`);
    },
    [filter, params]
  );

  return (
    <div className={styles.container}>
      {isOpen && (
        <input value={value} onChange={onChange} placeholder={t('search')} />
      )}
      <Button onClick={onSearch}>
        <FaSearch className={styles.search} />
      </Button>
    </div>
  );
};

export default Search;
