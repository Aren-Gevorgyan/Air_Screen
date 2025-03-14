"use client";

import React, { FC, lazy } from 'react'
import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import styles from './styles.module.scss';
import { ActorsType } from '@/assets/types';
import Image from 'next/image';
import { IMAGE_URL } from '@/assets/constants';
import Loadable from '@/components/loadable';
import { PERSON } from '@/assets/queryKeys';
import { getPerson } from '@/requests/csr';
import { isEmpty } from 'lodash';

const Modal = Loadable(lazy(() => import('@/components/modal')));

type Props = {
    state: boolean;
    setFalse: () => void;
    actor: ActorsType;
}

const ActorsModal: FC<Props> = ({ state, setFalse, actor }) => {
    const queryClient = useQueryClient();
    const cachedData = queryClient.getQueryData([PERSON, actor.id])
    const { data, isLoading }: UseQueryResult<ActorsType, Error> =
        useQuery({
            queryKey: [PERSON, actor.id],
            queryFn: () => getPerson(actor.id),
            initialData: cachedData,
        });

    return !isLoading && !isEmpty(data) && (
        <Modal isOpen={state} onClose={setFalse}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <Image
                        src={`${IMAGE_URL}/${data.profile_path}`}
                        alt={`AirScreen ${data.name} image`}
                        fill
                    />
                </div>
                <div className={styles.description}>
                    <h3>{data.name || ''}</h3>
                    <span>{data.birthday || ''}</span>
                    <p>{data.place_of_birth || ''}</p>
                    <p>{data.biography || ''}</p>
                </div>
            </div>
        </Modal>
    )
}

export default ActorsModal;