'use client';

import { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/components/button';
import Loading from '@/components/loading';
import { showToast } from '@/components/toast';
import {
  addTicket,
  deleteTicket,
  editTicket,
  fetchTickets,
} from '@/requests/firebase';
import { Ticket } from '@/assets/types';
import { useTranslations } from 'next-intl';

const AdminTickets = () => {
  const t = useTranslations('Words');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCheckingRole, setIsCheckingRole] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [isOrderEnabled, setIsOrderEnabled] = useState<boolean>(true);

  const today = new Date().toISOString().slice(0, 10);

  const loadTickets = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTickets();
      setTickets(data);
    } catch {
      showToast(t('admin_tickets_fetch_error'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const role = window.localStorage.getItem('air_screen_role');
    setIsAdmin(role === 'admin');
    setIsCheckingRole(false);
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      setIsLoading(false);
      return;
    }

    void loadTickets();
  }, [isAdmin]);

  const clearForm = () => {
    setTitle('');
    setDate('');
    setTime('');
    setImage('');
    setIsOrderEnabled(true);
    setEditingTicketId(null);
  };

  const onStartEdit = (ticket: Ticket) => {
    setEditingTicketId(ticket.id || null);
    setTitle(ticket.title);
    setDate(ticket.date);
    setTime(ticket.time);
    setImage(ticket.image);
    setIsOrderEnabled(ticket.isOrderEnabled ?? true);
  };

  const onCancelEdit = () => {
    clearForm();
  };

  const onToggleTicketOrders = async (ticket: Ticket) => {
    if (!ticket.id) return;

    const nextValue = !(ticket.isOrderEnabled ?? true);

    try {
      await editTicket(ticket.id, { isOrderEnabled: nextValue });
      showToast(
        nextValue
          ? t('admin_tickets_orders_enabled_success')
          : t('admin_tickets_orders_disabled_success'),
        'success'
      );
      await loadTickets();
    } catch {
      showToast(t('admin_tickets_update_error'), 'error');
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !date || !time || !image) {
      showToast(t('admin_tickets_fill_all'), 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingTicketId) {
        await editTicket(editingTicketId, {
          title,
          date,
          time,
          image,
          isOrderEnabled,
        });
        showToast(t('admin_tickets_update_success'), 'success');
      } else {
        await addTicket({
          title,
          date,
          time,
          image,
          isOrderEnabled,
          createdAt: Date.now(),
        });
        showToast(t('admin_tickets_create_success'), 'success');
      }

      clearForm();
      await loadTickets();
    } catch {
      showToast(
        editingTicketId
          ? t('admin_tickets_update_error')
          : t('admin_tickets_create_error'),
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async (ticketId?: string) => {
    if (!ticketId) return;
    try {
      await deleteTicket(ticketId);
      showToast(t('admin_tickets_delete_success'), 'success');
      await loadTickets();
    } catch {
      showToast(t('admin_tickets_delete_error'), 'error');
    }
  };

  if (isCheckingRole) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>{t('admin_tickets_only_admin')}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>{t('admin_tickets_title')}</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="ticket-title">
          {t('admin_tickets_movie_name')}
          <input
            id="ticket-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={t('admin_tickets_movie_name_placeholder')}
            required
            aria-label={t('admin_tickets_movie_name')}
          />
        </label>
        <label htmlFor="ticket-time">
          {t('admin_tickets_time')}
          <input
            id="ticket-time"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
            aria-label={t('admin_tickets_time')}
          />
        </label>
        <label htmlFor="ticket-date">
          {t('admin_tickets_date')}
          <input
            id="ticket-date"
            type="date"
            min={today}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
            aria-label={t('admin_tickets_date')}
          />
        </label>
        <label htmlFor="ticket-image">
          {t('admin_tickets_picture_url')}
          <input
            id="ticket-image"
            type="url"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder={t('admin_tickets_picture_url_placeholder')}
            required
            aria-label={t('admin_tickets_picture_url')}
          />
        </label>
        <label htmlFor="ticket-order-enabled" className={styles.checkboxLabel}>
          <input
            id="ticket-order-enabled"
            type="checkbox"
            checked={isOrderEnabled}
            onChange={(event) => setIsOrderEnabled(event.target.checked)}
            aria-label={t('admin_tickets_order_enabled')}
          />
          {t('admin_tickets_order_enabled')}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? editingTicketId
              ? t('admin_tickets_updating')
              : t('admin_tickets_creating')
            : editingTicketId
              ? t('admin_tickets_update')
              : t('admin_tickets_create')}
        </Button>
        {editingTicketId && (
          <Button type="button" onClick={onCancelEdit}>
            {t('cancel')}
          </Button>
        )}
      </form>

      {isLoading ? (
        <Loading />
      ) : (
        <ul className={styles.list}>
          {tickets.length ? (
            tickets.map((ticket) => (
              <li key={ticket.id} className={styles.card}>
                <img src={ticket.image} alt={ticket.title} loading="lazy" />
                <div className={styles.cardContent}>
                  <p>{ticket.title}</p>
                  <span>
                    {ticket.date} {ticket.time}
                  </span>
                  <span className={styles.status}>
                    {ticket.isOrderEnabled ?? true
                      ? t('admin_tickets_orders_enabled')
                      : t('admin_tickets_orders_disabled')}
                  </span>
                  <div className={styles.cardActions}>
                    <Button type="button" onClick={() => onStartEdit(ticket)}>
                      {t('edit')}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => void onToggleTicketOrders(ticket)}
                    >
                      {(ticket.isOrderEnabled ?? true)
                        ? t('admin_tickets_disable_orders')
                        : t('admin_tickets_enable_orders')}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => void onDelete(ticket.id)}
                      className={styles.deleteButton}
                    >
                      {t('admin_tickets_delete')}
                    </Button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className={styles.empty}>{t('admin_tickets_empty')}</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminTickets;
