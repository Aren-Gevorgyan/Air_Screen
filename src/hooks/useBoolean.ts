import { BooleanHook } from '@/assets/types';
import { useCallback, useState } from 'react';

const useBoolean = (initialValue: boolean = false): BooleanHook => {
  const [open, setOpen] = useState<boolean>(initialValue);

  const setTrue = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  const setFalse = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const setToggle = useCallback(() => setOpen((prev) => !prev), [setOpen]);

  return {
    state: open,
    setTrue,
    setFalse,
    setToggle,
  };
};

export default useBoolean;
