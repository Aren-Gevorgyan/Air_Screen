'use client'

import React, { FC, memo, useState } from 'react';
import styles from './styles.module.scss';
import Button from '../button';
import { FaCopy } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

type Props = {
  textToCopy: string,
  className: string,
  buttonTitle: string,
  buttonText: string,
}

const Copyable: FC<Props> = ({ textToCopy = '', buttonTitle = '', buttonText, className }) => {
  const t = useTranslations('Words');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={styles.container}>
      <Button title={t(buttonTitle)} onClick={handleCopy} className={className}>
        {!!buttonText && <span>{buttonText}</span>} {copied ? <FaCheck color="#0ae30d" /> : <FaCopy />}
      </Button>
    </div>
  );
};

export default memo(Copyable);
