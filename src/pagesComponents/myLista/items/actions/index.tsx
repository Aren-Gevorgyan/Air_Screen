'use client';

import Button from '@/components/button';
import { memo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './styles.module.scss';
import { deleteItem } from '@/requests/csr';

type Props = {
    id?: string
};

const Actions = ({ id }: Props) => {

    const handleEdit = () => {
        console.log('Editing item:', id);
    };

    const handleDelete = async () => {
        try {
            id && await deleteItem(id);
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