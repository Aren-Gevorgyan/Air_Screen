'use client';

import React, { FC, useState } from 'react';
import Button from '../button';
import { FaCopy } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import SignInWrapper from '@/hoc/signInWrapper';

type Props = {
  textToCopy: string;
  className: string;
  buttonTitle: string;
  buttonText: string;
};

const Copyable: FC<Props> = ({
  textToCopy = '',
  buttonTitle = '',
  buttonText,
  className,
}) => {
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
    <Button title={t(buttonTitle)} onClick={handleCopy} className={className}>
      {!!buttonText && <span>{buttonText}</span>}{' '}
      {copied ? <FaCheck color="#0ae30d" /> : <FaCopy />}
    </Button>
  );
};

export default SignInWrapper(Copyable);
