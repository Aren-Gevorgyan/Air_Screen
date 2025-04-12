'use client';

import React, { FC, memo, useCallback } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Button from '../button';
import useBoolean from '@/hooks/useBoolean';

type Props = {
  className: string;
};

const SaveButton: FC<Props> = ({ className }) => {
  const { state: isSaved, setToggle } = useBoolean(false);

  const onClick = useCallback(() => {
    setToggle();
  }, []);

  return (
    <Button className={className} onClick={onClick}>
      {isSaved ? (
        <FaBookmark className="white" size={25} />
      ) : (
        <FaRegBookmark className="black" size={25} />
      )}
    </Button>
  );
};

export default memo(SaveButton);
