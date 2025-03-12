import React, { FC } from 'react'
import styles from './styles.module.scss';
import { FaStar } from "react-icons/fa";

type Props = { rating: number }

const StarRating: FC<Props> = ({ rating }) => {
    const rat = Math.ceil(rating / 2);

    return (
        <div className={styles.container}>
            {[...Array(5)].map((_, i) => {
                return (
                    <span key={i}>
                        {rat > i ? <FaStar className="yellow"
                        /> : <FaStar className="gray" />}
                    </span>
                );
            })}
        </div>
    )
}

export default StarRating;
