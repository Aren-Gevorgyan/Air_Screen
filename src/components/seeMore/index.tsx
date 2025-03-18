import React, { FC, memo } from 'react'
import Button from '../button'
import styles from './styles.module.scss';
import ArrowRight from '../../../public/svgs/arrowRight';

type Props = {
    fetchNextPage: () => void;
}

const SeeMore: FC<Props> = ({ fetchNextPage }) => {
    return (
        <div className={styles.container}>
            <Button className={styles.seeMore} onClick={() => fetchNextPage()}><ArrowRight color="white" /></Button>
        </div>
    )
}

export default memo(SeeMore);