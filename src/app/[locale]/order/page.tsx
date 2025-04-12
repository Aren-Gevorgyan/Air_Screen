'use client'

import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { InputParamter, Movies } from "@/assets/types";
import Button from "@/components/button";
import { addMovie, editItem, fetchMovieById } from "@/requests/firebase";
import { useTranslations } from "next-intl";
import styles from './styles.module.scss';
import { Link, useRouter } from "@/i18n/navigation";
import useQueryParam from "@/hooks/useQueryParam";
import { showToast } from "@/components/toast";
import { useAuth } from "@clerk/clerk-react";

const Order = () => {
    const auth = useAuth();
    const t = useTranslations("Words");
    const { push } = useRouter();
    const movieId = useQueryParam('id');
    const [filmId, setFilmId] = useState<string>('');
    const [filmName, setFilmName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [hour, setHour] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [errorMessage, setError] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (movieId) {
            fetchMovieById(movieId).then((res: Movies | null) => {
                if (!res) return;
                setDate(res.date);
                setFilmId(res.filmId);
                setFilmName(res.name);
                setHour(res.hour);
                setPhone(res.phone);
            }).catch(() => showToast(t('edit_error'), 'error'))
        }
    }, [movieId]);

    const onChange = useCallback((callback: (val: string) => void) => (event: InputParamter) => {
        callback(event.target.value);
    }, []);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!filmName || !date || !hour) return setError(t('error_empty'));
        try {
            setLoading(true);
            if (movieId) {
                await editItem(movieId, {
                    filmId,
                    name: filmName,
                    date,
                    hour,
                    phone,
                });
                push('/my_orders')
            } else {
                await addMovie({
                    filmId,
                    userId: auth.userId,
                    name: filmName,
                    date,
                    hour,
                    phone,
                });
                push('my_orders');
            }

            setLoading(false);
        } catch (error) {
            console.log("🚀 ~ onSubmit ~ error:", error)
            setError(t('save_movie_error'));
            if (movieId) showToast(t('edit_error'), 'error')
        }
    }

    useEffect(() => {
        return () => {
            setDate('');
            setFilmId('');
            setFilmName('');
            setHour('');
            setError('');
            setPhone('')
        }
    }, []);

    return (
        <form className={styles.container} onSubmit={onSubmit}>
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
                    {t('hour')} *
                    <input type='string' name='hour' required value={hour} onChange={onChange(setHour)} placeholder={"hh:mm"} />
                </label>
                <label>
                    {t('date')} *
                    <input type='date' name='date' required value={date} onChange={onChange(setDate)} />
                </label>
                <label>
                    {t('phone')} *
                    <input type='string' name='phone' placeholder={t('phone')} required value={phone} onChange={onChange(setPhone)} />
                </label>
                {errorMessage && <span className={styles.error}>{errorMessage}</span>}
            </div>
            <div className={styles.buttons}>
                <Link href='/my_orders'>{t('cancel')}</Link>
                <Button disabled={isLoading} type="submit">{movieId ? t('edit') : t('create')}</Button>
            </div>
        </form>
    )
}

export default Order;
