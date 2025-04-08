'use client'

import { InputParamter } from "@/assets/types";
import Button from "@/components/button";
import { addMovie } from "@/requests/csr";
import { useTranslations } from "next-intl";
import { FormEvent, useCallback, useEffect, useState } from "react";
import styles from './styles.module.scss';
import { Link, useRouter } from "@/i18n/navigation";

const Order = () => {
    const t = useTranslations("Words");
    const { push } = useRouter();
    const [filmId, setFilmId] = useState<string>('');
    const [filmName, setFilmName] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [hour, setHour] = useState<string>('');
    const [errorMessage, setError] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);

    const onChange = useCallback((callback: (val: string) => void) => (event: InputParamter) => {
        callback(event.target.value);
    }, []);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!filmName || !date || !hour) return setError(t('error_empty'));
        try {
            setLoading(true);
            await addMovie({
                id: filmId,
                name: filmName,
                date,
                hour
            });
            push('my_lists');
            setLoading(false);
        } catch (error) {
            setError(t('save_movie_error'));
        }
    }

    useEffect(() => {
        return () => {
            setDate('');
            setFilmId('');
            setFilmName('');
            setHour('');
            setError('')
        }
    }, [])

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
                {errorMessage && <span className={styles.error}>{errorMessage}</span>}
            </div>
            <div className={styles.buttons}>
                <Link href='/my_lists'>{t('cancel')}</Link>
                <Button disabled={isLoading} type="submit">{t('create')}</Button>
            </div>
        </form>
    )
}

export default Order;
