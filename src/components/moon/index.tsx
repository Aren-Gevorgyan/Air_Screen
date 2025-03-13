import React, { memo } from 'react'
import styles from './styles.module.scss';
import LazyImage from '../lazyImages';

const Moon = () => {
    return (
        <div className={styles.moon} >
            <LazyImage src='/images/moon.png' alt="AirScreen moon" />
        </div>
    )
}

export default memo(Moon);