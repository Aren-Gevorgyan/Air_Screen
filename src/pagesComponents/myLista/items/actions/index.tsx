'use client';

import Button from '@/components/button';
import { memo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './styles.module.scss';
import { deleteItem, fetchMovies } from '@/requests/csr';
import { Movies } from '@/assets/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '@/components/toast';
import { useTranslations } from 'next-intl';
type Props = {
    id?: string,
    setLoading: (val: boolean) => void,
    setMovies: (val: Array<Movies>) => void
};

const Actions = ({ id, setMovies, setLoading }: Props) => {
    const t = useTranslations("Words");

    const handleEdit = () => {
        console.log('Editing item:', id);
    };

    const handleDelete = async () => {
        try {
            id && await deleteItem(id);
            showToast(t('success_order_delete'), 'success');
            fetchMovies().then((res:  Array<Movies | any> | undefined) => {
                if (res) setMovies(res);
            }).finally(() => {
                setLoading(false);
            });
        } catch (err) {
            showToast(t('error_order_delete'), 'error');
            console.error('Delete failed:', err);
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <Button onClick={handleEdit} className={styles.edit}>
                    <FaEdit />
                </Button>
                <Button onClick={handleDelete} className={styles.delete}>
                    <FaTrash />
                </Button>
            </div>
        </div>
    );
}


export default memo(Actions)