'use client';

import { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Ticket } from '@/assets/types';
import { addMovie, fetchTickets } from '@/requests/firebase';
import Loading from '@/components/loading';
import Button from '@/components/button';
import Modal from '@/components/modal';
import { showToast } from '@/components/toast';
import { useGuestUserId } from '@/hooks/useGuestUserId';
import { useTranslations } from 'next-intl';
import {
  GENERAL_GUEST_PRICE,
  INDIVIDUAL_PRICE_THREE_OR_MORE,
  INDIVIDUAL_PRICE_UP_TO_TWO,
  KALIAN_PRICE,
  POPCORN_PRICE,
  ROMANTIC_DINNER_PRICE,
} from '@/assets/constants';

const FutureTickets = () => {
  const t = useTranslations('Words');
  const userId = useGuestUserId();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [phone, setPhone] = useState<string>('');
  const [guestCount, setGuestCount] = useState<string>('1');
  const [watchType, setWatchType] = useState<string>('general');
  const [popcornCount, setPopcornCount] = useState<string>('0');
  const [hasKalian, setHasKalian] = useState<boolean>(false);
  const [hasRomanticDinner, setHasRomanticDinner] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchTickets()
      .then((data) => {
        setTickets(data);
      })
      .catch(() => {
        showToast(t('future_tickets_load_error'), 'error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onOpenModal = (ticket: Ticket) => {
    if (!(ticket.isOrderEnabled ?? true)) return;
    setSelectedTicket(ticket);
  };

  const onCloseModal = () => {
    setSelectedTicket(null);
    setPhone('');
    setGuestCount('1');
    setWatchType('general');
    setPopcornCount('0');
    setHasKalian(false);
    setHasRomanticDinner(false);
  };

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
    chargeablePopcornCount = Math.max(0, popcornCountNumber - 2);
  }

  const totalPrice =
    basePrice +
    chargeablePopcornCount * POPCORN_PRICE +
    (hasKalian ? KALIAN_PRICE : 0) +
    (hasRomanticDinner ? ROMANTIC_DINNER_PRICE : 0);

  const onSubmitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedTicket) return;

    if (!phone) {
      showToast(t('future_tickets_phone_required'), 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      await addMovie({
        userId: userId || undefined,
        name: selectedTicket.title,
        date: selectedTicket.date,
        hour: selectedTicket.time,
        type: t('movie'),
        phone,
        popcornCount: popcornCountNumber,
        kalian: hasKalian,
        romanticDinner: hasRomanticDinner,
        guestCount: guestCountNumber,
        watchType,
      });

      showToast(t('future_tickets_order_success'), 'success');
      onCloseModal();
    } catch {
      showToast(t('future_tickets_order_error'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTicketExpired = (date: string, time: string) => {
    if (!date || !time) return false;

    const dateParts = date.split('-').map(Number);
    const timeParts = time.split(':').map(Number);

    if (dateParts.length !== 3 || timeParts.length < 2) return false;

    const [year, month, day] = dateParts;
    const [hours, minutes] = timeParts;

    if (
      [year, month, day, hours, minutes].some((value) => Number.isNaN(value))
    ) {
      return false;
    }

    const ticketDateTime = new Date(year, month - 1, day, hours, minutes, 0, 0);
    return ticketDateTime.getTime() < Date.now();
  };

  if (isLoading) {
    return (
      <section className={styles.container}>
        <Loading />
      </section>
    );
  }

  if (!tickets.length) return null;

  const visibleTickets = tickets
    .filter((ticket) => {
      return Boolean(ticket.title && ticket.date && ticket.time && ticket.image);
    })
    .slice(-6);

  return (
    <section className={styles.container}>
      <h2>{t('future_tickets_title')}</h2>
      <div className={styles.grid}>
        {visibleTickets.map((ticket) => {
          const isExpired = isTicketExpired(ticket.date, ticket.time);
          const isOrderDisabled = !(ticket.isOrderEnabled ?? true);
          const isTicketDisabled = isExpired || isOrderDisabled;

          return (
            <article
              key={ticket.id || `${ticket.title}-${ticket.date}-${ticket.time}`}
              className={`${styles.card} ${isTicketDisabled ? styles.cardDisabled : ''}`}
              aria-disabled={isTicketDisabled}
            >
              <img src={ticket.image} alt={ticket.title} loading="lazy" />
              <div className={styles.cardContent}>
                <h3>{ticket.title}</h3>
                <p>
                  {ticket.date} {ticket.time}
                </p>
                <Button
                  onClick={() => onOpenModal(ticket)}
                  aria-label={`${t('future_tickets_order_aria')} ${ticket.title}`}
                  disabled={isTicketDisabled}
                >
                  {isOrderDisabled
                    ? t('future_tickets_orders_disabled')
                    : t('future_tickets_order_button')}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <Modal isOpen={Boolean(selectedTicket)} onClose={onCloseModal}>
        <div
          className={styles.modalContent}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={t('future_tickets_modal_aria')}
        >
          <h3>{selectedTicket?.title}</h3>
          <p className={styles.ticketMeta}>
            {selectedTicket?.date} {selectedTicket?.time}
          </p>
          <form onSubmit={onSubmitOrder}>
            <label htmlFor="ticket-phone">
              {t('phone')}*
              <input
                id="ticket-phone"
                type="text"
                placeholder={t('phone')}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                aria-label={t('phone')}
              />
            </label>

            <div className={styles.row}>
              <label htmlFor="ticket-guests">
                {t('guests')}
                <input
                  id="ticket-guests"
                  type="number"
                  min={1}
                  value={guestCount}
                  onChange={(event) => setGuestCount(event.target.value)}
                  aria-label={t('guests')}
                />
              </label>

              <label htmlFor="ticket-popcorn">
                {t('popcorn')} {t('popcorn_price')}
                <input
                  id="ticket-popcorn"
                  type="number"
                  min={0}
                  value={popcornCount}
                  onChange={(event) => setPopcornCount(event.target.value)}
                  aria-label={t('popcorn')}
                />
              </label>
            </div>

            <label htmlFor="ticket-watch-type">
              {t('watch_type')}
              <select
                id="ticket-watch-type"
                value={watchType}
                onChange={(event) => {
                  const value = event.target.value;
                  setWatchType(value);
                  if (value === 'general') {
                    setHasKalian(false);
                    setHasRomanticDinner(false);
                  }
                }}
              >
                <option value="general">{t('watch_type_general_mobile')}</option>
                <option value="individual">{t('watch_type_individual_mobile')}</option>
              </select>
            </label>

            <label className={styles.checkboxRow} htmlFor="ticket-kalian">
              <input
                id="ticket-kalian"
                type="checkbox"
                checked={hasKalian}
                onChange={(event) => setHasKalian(event.target.checked)}
                disabled={watchType === 'general'}
              />
              {t('kalian')} {t('kalian_price')}
            </label>

            <label className={styles.checkboxRow} htmlFor="ticket-romantic">
              <input
                id="ticket-romantic"
                type="checkbox"
                checked={hasRomanticDinner}
                onChange={(event) => setHasRomanticDinner(event.target.checked)}
                disabled={watchType === 'general'}
              />
              {t('romantic_dinner')} {t('romantic_dinner_price')}
            </label>

            <p className={styles.total}>
              {t('total_cost')}: <span>{totalPrice.toLocaleString('en-US')} AMD</span>
            </p>

            <div className={styles.actions}>
              <Button type="button" onClick={onCloseModal}>
                {t('cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t('future_tickets_saving')
                  : t('future_tickets_confirm_order')}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  );
};

export default FutureTickets;
