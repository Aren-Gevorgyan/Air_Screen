'use client'

import Button from '@/components/button';
import { useTranslations } from 'next-intl';
import useBoolean from '@/hooks/useBoolean';
import Loadable from '@/hoc/loadable';
import { FormEvent, lazy, useCallback, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { InputParamter } from '@/assets/types';

import { addMovie, fetchUsers } from '@/requests/csr';
import { log } from 'console';

const Modal = Loadable(lazy(() => import('@/components/modal')));

const AddVisitModal = () => {
    const t = useTranslations("Words");
    const [filmId, setFilmId] = useState<string>('');
    const [filmName, setFilmName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const { state: isOpen, setTrue: setOpenModal, setFalse: setCloseModal } = useBoolean();

    const onChange = useCallback((callback: (val: string) => void) => (event: InputParamter) => {
        callback(event.target.value);
    }, []);


    useEffect(() => {
        fetchUsers().then((res) => console.log(res));
    }, [])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await addMovie({
            id: filmId,
            name: filmName,
            date: date
        });
        console.log("🚀 ~ onSubmit ~ sss:", data)
    }

    return (
        <div className={styles.container}>
            <Button className={styles.registr} onClick={setOpenModal}>{t('registr')}</Button>
            {isOpen &&
                <Modal isOpen={isOpen} onClose={setCloseModal} className={styles.modal}>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <div>
                            <label>
                                {t('film_id')}
                                <input type='string' name='filmID' value={filmId} onChange={onChange(setFilmId)} placeholder={t('film_id')} />
                            </label>
                            <label>
                                {t('film_name')} *
                                <input type='string' name='filmName' required value={filmName} onChange={onChange(setFilmName)} placeholder={t('film_name')} />
                            </label>
                            <label>
                                {t('date')} *
                                <input type='date' name='date' required value={date} onChange={onChange(setDate)} />
                            </label>
                        </div>
                        <div className={styles.buttons}>
                            <Button onClick={setCloseModal}>{t('cancel')}</Button>
                            <Button type="submit">{t('create')}</Button>
                        </div>
                    </form>
                </Modal>
            }
        </div>
    )
};

export default AddVisitModal;
