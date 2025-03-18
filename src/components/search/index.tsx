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

const Search = () => {
  const { isMd } = useWindowSize();
  const { push } = useRouter();
  const filter = useQueryParam('value');
  const [value, setValue] = useState<string>('');
  const { state: isOpen, setTrue, setFalse, setToggle } = useBoolean(isMd || !!filter);

  useEffect(() => {
    if (filter && "null" !== filter) return setValue(filter);
    setValue('');
  }, [filter]);

  useEffect(() => {
    if (isMd) {
      setTrue()
    } else {
      setFalse
    }
  }, [isMd]);

  const onChange = (event: InputParamter) => {
    setValue(event.target.value);
    push(`/search?value=${event.target.value}`);
  };

  const onSearch = useCallback((event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    setToggle();
    if (filter && "null" !== filter) push(`/search?value=${filter}`);
  }, [filter]);

  return (
    <div className={styles.container}>
      {isOpen && (
        <input value={value} onChange={onChange} placeholder="Որոնել" />
      )}
      <Button onClick={onSearch}>
        <FaSearch className={styles.search} />
      </Button>
    </div>
  );
};

export default Search;
