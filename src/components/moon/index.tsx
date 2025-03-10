import React, { memo } from 'react'
import styles from './styles.module.scss';

const Moon = () => {
    return (
        <div className={styles.moon} />
    )
}

export default memo(Moon);