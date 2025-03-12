'use client'

import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FC, memo, useCallback } from "react";
import Button from "../button";
import useBoolean from "@/hooks/useBoolean";

type Props = {
  className: string;
}

const SaveButton: FC<Props> = ({ className }) => {
  const { state: isSaved, setToggle } = useBoolean(false);

  const onClick = useCallback(() => {
    setToggle();
  }, []);

  return (
    <Button className={className} onClick={onClick}>
      {isSaved ? <FaBookmark className="white" size={30} /> : <FaRegBookmark className="black" size={30} />}
    </Button>
  );
}

export default memo(SaveButton); 