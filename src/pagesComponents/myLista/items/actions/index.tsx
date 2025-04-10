'use client';

import Button from '@/components/button';
import { memo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './styles.module.scss';
import { deleteItem, fetchMovies } from '@/requests/csr';
import { Movies } from '@/assets/types';

type Props = {
    id?: string,
    setLoading: (val: boolean) => void,
    setMovies: (val: Array<Movies>) => void
};

const Actions = ({ id, setMovies, setLoading }: Props) => {

    const handleEdit = () => {
        console.log('Editing item:', id);
    };

    const handleDelete = async () => {
        try {
            id && await deleteItem(id);
            fetchMovies().then((res:  Array<Movies | any> | undefined) => {
                if (res) setMovies(res);
            }).finally(() => {
                setLoading(false);
            });
        } catch (err) {
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