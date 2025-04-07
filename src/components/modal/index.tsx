'use client';

import React, { FC, useEffect } from 'react';
import ReactModal from 'react-modal';
import customStyles from './style';

import styles from './styles.module.scss';
import { clsx } from 'clsx';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string
};

const Modal: FC<Props> = ({ isOpen, onClose, className, children }) => {
  useEffect(() => {
    ReactModal.setAppElement('#__next');
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      style={customStyles}
      overlayClassName="modalOverlay"
      ariaHideApp={false} // Necessary for Next.js to prevent errors
    >
      <div className={clsx(styles.container, className)}>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
