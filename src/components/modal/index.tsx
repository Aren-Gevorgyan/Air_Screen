'use client';

import React, { FC, useEffect } from 'react';
import ReactModal from 'react-modal';
import customStyles from './style';
import Button from '../button';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
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
      <Button onClick={onClose} className={styles.container}>
        {children}
      </Button>
    </ReactModal>
  );
};

export default Modal;
