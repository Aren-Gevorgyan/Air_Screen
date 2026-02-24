'use client';

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { InputParamter, Movies } from '@/assets/types';
import Button from '@/components/button';
import { addMovie, editItem, fetchMovieById } from '@/requests/firebase';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';
import { Link, useRouter } from '@/i18n/navigation';
import useQueryParam from '@/hooks/useQueryParam';
import { showToast } from '@/components/toast';
import { useGuestUserId } from '@/hooks/useGuestUserId';
import {
  GENERAL_GUEST_PRICE,
  INDIVIDUAL_PRICE_THREE_OR_MORE,
  INDIVIDUAL_PRICE_UP_TO_TWO,
  KALIAN_PRICE,
  MOBILE_BREAKPOINT,
  ORDER_MINUTES_MAX,
  ORDER_MINUTES_MIN,
  ORDER_TIME_MAX,
  ORDER_TIME_MIN,
  POPCORN_PRICE,
  ROMANTIC_DINNER_PRICE,
} from '@/assets/constants';

const Order = () => {
  const t = useTranslations('Words');
  const { push } = useRouter();
  const userId = useGuestUserId();
  const movieId = useQueryParam('id');
  // const [filmId, setFilmId] = useState<string>('');
  const [filmName, setFilmName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [errorMessage, setError] = useState<string>('');
  const [type, setType] = useState<string>(t('movie'));
  const [firstOponent, setFirstOponent] = useState<string>('');
  const [secondOponent, setSecondOponent] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [popcornCount, setPopcornCount] = useState<string>('0');
  const [hasKalian, setHasKalian] = useState<boolean>(false);
  const [hasRomanticDinner, sethasRomanticDinner] = useState<boolean>(false);
  const [guestCount, setGuestCount] = useState<string>('1');
  const [watchType, setWatchType] = useState<string>('general');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (movieId) {
      fetchMovieById(movieId)
        .then((res: Movies | null) => {
          if (!res) return;
          setDate(res.date);
          setType(res.type);
          // setFilmId(res.filmId);
          setHour(res.hour);
          setPhone(res.phone);
          if (res.name) setFilmName(res.name);
          if (res.firstOponent) setFirstOponent(res.firstOponent);
          if (res.secondOponent) setSecondOponent(res.secondOponent);
          if (typeof res.popcornCount === 'number') {
            setPopcornCount(String(res.popcornCount));
          }
          if (typeof res.kalian === 'boolean') {
            setHasKalian(res.kalian);
          }
          if (typeof res.romanticDinner === 'boolean') {
            sethasRomanticDinner(res.romanticDinner);
          }
          if (typeof res.guestCount === 'number') {
            setGuestCount(String(res.guestCount));
          }
          if (typeof res.watchType === 'string') {
            setWatchType(res.watchType);
          }
        })
        .catch(() => showToast(t('edit_error'), 'error'));
    }
  }, [movieId]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onChange = useCallback(
    (callback: (val: string) => void) => (event: InputParamter) => {
      callback(event.target.value);
    },
    []
  );

  const today = new Date().toISOString().slice(0, 10);

  const guestCountNumber = Math.max(1, Number(guestCount) || 1);
  const popcornCountNumber = Math.max(0, Number(popcornCount) || 0);

  const basePrice =
    watchType === 'general'
      ? guestCountNumber * GENERAL_GUEST_PRICE
      : guestCountNumber <= 2
        ? INDIVIDUAL_PRICE_UP_TO_TWO
        : INDIVIDUAL_PRICE_THREE_OR_MORE;

  let chargeablePopcornCount = popcornCountNumber;
  if (watchType === 'individual') {
    if (popcornCountNumber <= 2) {
      chargeablePopcornCount = 0;
    } else {
      chargeablePopcornCount = popcornCountNumber - 2;
    }
  }

  const addonsPrice =
    chargeablePopcornCount * POPCORN_PRICE +
    (hasKalian ? KALIAN_PRICE : 0) +
    (hasRomanticDinner ? ROMANTIC_DINNER_PRICE : 0);

  const totalPrice = basePrice + addonsPrice;

  const isDateValid = (value: string) => {
    if (!value) return false;
    const selected = new Date(value);
    const min = new Date(today);
    selected.setHours(0, 0, 0, 0);
    min.setHours(0, 0, 0, 0);
    return selected >= min;
  };

  const isTimeInRange = (time: string) => {
    if (!time || !time.includes(':')) return false;
    const [h, m] = time.split(':').map(Number);
    const minutes = h * 60 + m;
    const minMinutes = ORDER_MINUTES_MIN;
    const maxMinutes = ORDER_MINUTES_MAX;
    return minutes >= minMinutes && minutes <= maxMinutes;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorName =
      type === t('movie') ? !filmName : !(firstOponent && secondOponent);
    if (errorName || !date || !hour) return setError(t('error_empty'));
    if (!isDateValid(date)) {
      return setError(t('error_time_range'));
    }
    if (!isTimeInRange(hour)) {
      return setError(t('error_time_range'));
    }
    try {
      setLoading(true);
      const popcornCountValue = Number(popcornCount) || 0;
      const orderDetails = {
        userId: userId || undefined,
        name: filmName,
        date,
        hour,
        type,
        phone,
        firstOponent,
        secondOponent,
        popcornCount: popcornCountValue,
        kalian: hasKalian,
        romanticDinner: hasRomanticDinner,
        guestCount: guestCountNumber,
        watchType,
      };
      if (movieId) {
        await editItem(movieId, {
          // filmId,
          name: filmName,
          date,
          hour,
          phone,
          type,
          firstOponent,
          secondOponent,
          popcornCount: popcornCountValue,
          kalian: hasKalian,
          romanticDinner: hasRomanticDinner,
          guestCount: guestCountNumber,
          watchType,
        });
        void fetch('/api/send-telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        });
        push('/my_orders');
      } else {
        await addMovie(orderDetails);
        void fetch('/api/send-telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        });
        push('my_orders');
      }

      setLoading(false);
    } catch {
      setError(t('save_movie_error'));
      if (movieId) showToast(t('edit_error'), 'error');
    }
  };

  useEffect(() => {
    return () => {
      setDate('');
      // setFilmId('');
      setFilmName('');
      setHour('');
      setError('');
      setPhone('');
      setType(t('movie'));
      setFirstOponent('');
      setSecondOponent('');
      setPopcornCount('0');
      setHasKalian(false);
      sethasRomanticDinner(false);
      setGuestCount('1');
      setWatchType('general');
    };
  }, []);

  const onSelectorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  return (
    <div className={styles.container}>
      <p className={styles.info}>{t('order_info')}</p>
      <form className={styles.content} onSubmit={onSubmit}>
        <div>
          <label>
            {t('type')}
            <select value={type} onChange={onSelectorChange}>
              <option value={t('movie')}>{t('movie')}</option>
              <option value={t('football')}>{t('football')}</option>
              <option value="UFC">UFC</option>
            </select>
          </label>
          {type === t('movie') || !type ? (
            <>
              {/* <label>
                {t('film_id')}
                <input
                  type="string"
                  name="filmID"
                  value={filmId}
                  onChange={onChange(setFilmId)}
                  placeholder={t('film_id')}
                />
              </label> */}
              <label>
                {t('film_name')} *
                <input
                  type="string"
                  name="filmName"
                  required
                  value={filmName}
                  onChange={onChange(setFilmName)}
                  placeholder={t('film_name')}
                />
              </label>
            </>
          ) : (
            <label className={styles.item}>
              {t('names_com')} *
              <div>
                <input
                  type="string"
                  name="firstItem"
                  required
                  value={firstOponent}
                  onChange={onChange(setFirstOponent)}
                  placeholder={t('name')}
                />
                <span>vs</span>
                <input
                  type="string"
                  name="secondItem"
                  required
                  value={secondOponent}
                  onChange={onChange(setSecondOponent)}
                  placeholder={t('name')}
                />
              </div>
            </label>
          )}
          <label>
            {t('hour')} * ({t('hour_range_hint')})
            <input
              type="time"
              name="hour"
              required
              min={ORDER_TIME_MIN}
              max={ORDER_TIME_MAX}
              value={hour}
              onChange={onChange(setHour)}
            />
          </label>
          <label>
            {t('date_watch')} *
            <input
              type="date"
              name="date"
              required
              min={today}
              value={date}
              onChange={onChange(setDate)}
            />
          </label>
          <label>
            {t('phone')} *
            <input
              type="string"
              name="phone"
              placeholder={t('phone')}
              required
              value={phone}
              onChange={onChange(setPhone)}
            />
          </label>
          <label>
            {t('guests')}
            <input
              type="number"
              name="guests"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
            />
          </label>
          <label>
            {t('watch_type')}
            <select
              value={watchType}
              onChange={(e) => setWatchType(e.target.value)}
            >
              <option value="general">
                {isMobile
                  ? t('watch_type_general_mobile')
                  : t('watch_type_general')}
              </option>
              <option value="individual">
                {isMobile
                  ? t('watch_type_individual_mobile')
                  : t('watch_type_individual')}
              </option>
            </select>
          </label>
          <p className={styles.addonsTitle}>{t('addons')}</p>
          <label>
            {t('popcorn')} {t('popcorn_price')}
            <input
              type="number"
              name="popcorn"
              min={0}
              value={popcornCount}
              onChange={(e) => setPopcornCount(e.target.value)}
            />
          </label>
          <label className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="kalian"
              checked={hasKalian}
              onChange={(e) => setHasKalian(e.target.checked)}
              className={styles.checkbox}
            />
            {t('kalian')} {t('kalian_price')}
          </label>
          <label className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="romanticDinner"
              checked={hasRomanticDinner}
              onChange={(e) => sethasRomanticDinner(e.target.checked)}
              className={styles.checkbox}
            />
            {t('romantic_dinner')} {t('romantic_dinner_price')}
          </label>
          {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        </div>
        <div className={styles.total}>
          <p>
            {t('total_cost')}:&nbsp;
            <strong>{totalPrice.toLocaleString('en-US')} AMD</strong>
          </p>
        </div>
        <div className={styles.buttons}>
          <Link href="/my_orders">{t('cancel')}</Link>
          <Button disabled={isLoading} type="submit">
            {movieId ? t('edit') : t('create')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Order;
