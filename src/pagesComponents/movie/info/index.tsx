import React, { FC } from 'react'
import styles from './styles.module.scss';
import Actors from '../actors';
import SaveButton from '@/components/saveButton';
import Description from '../description';
import Genres from '../genres';
import { ActorsType, MovieData } from '@/assets/types';
import Copyable from '@/components/copyable';

type Props = {
    movie: MovieData,
    actors: { cast: ActorsType },
}

const Info: FC<Props> = ({ movie, actors }) => {
    return (
        <div className={styles.container}>
            <span className={styles.title}>{movie.title || ''}</span>
            <Actors actors={actors.cast} />
            <div className={styles.buttons}>
                <Copyable textToCopy={String(movie.id)} buttonText="ID" className={styles.pick} buttonTitle="get_movie_id"/>
                <SaveButton className={styles.save} />
            </div>
            {movie?.genres?.length && <Genres genres={movie.genres} />}
            <Description movie={movie} />
        </div>
    )
}

export default Info