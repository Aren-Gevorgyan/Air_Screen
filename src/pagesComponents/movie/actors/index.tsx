'use client';

import React, { FC, lazy, useCallback, useState } from 'react';
import styles from './styles.module.scss';
import { ActorsType } from '@/assets/types';
import Image from 'next/image';
import { IMAGE_URL } from '@/assets/constants';
import Button from '@/components/button';
import useBoolean from '@/hooks/useBoolean';
import Loadable from '@/hoc/loadable';
import { useTranslations } from 'next-intl';

const ActorsModal = Loadable(lazy(() => import('./actorsModal')));

type Props = {
  actors: Array<ActorsType> | ActorsType;
};

const Actors: FC<Props> = ({ actors }) => {
  const t = useTranslations('Words');
  const actorsList = Array.isArray(actors) ? actors : [actors];
  const { state, setTrue, setFalse } = useBoolean();
  const [actor, setActor] = useState<ActorsType>(actorsList[0]);
  const data = actorsList.slice(0, 6);

  const onClick = useCallback(
    (val: ActorsType) => () => {
      setTrue();
      setActor(val);
    },
    []
  );

  return (
    <div className={styles.container}>
      {data.map((val) => (
        <Button
          title={t('seeMore')}
          key={val.id}
          onClick={onClick(val)}
          className={styles.item}
        >
          {val.profile_path && (
            <Image
              src={`${IMAGE_URL}/${val.profile_path}`}
              alt={`AirScreen ${val.name} image`}
              fill
            />
          )}
        </Button>
      ))}
      {state && <ActorsModal state={state} setFalse={setFalse} actor={actor} />}
    </div>
  );
};

export default Actors;
