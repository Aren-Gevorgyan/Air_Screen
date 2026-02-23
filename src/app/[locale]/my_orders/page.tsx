import styles from './styles.module.scss';
import Items from '@/pagesComponents/myOrders/items';
import Moon from '@/components/moon';

const GUEST_USER_ID: string | null = null;

const MyOrders = async () => {
  return (
    <div className={styles.container}>
      <Moon />
      <Items userId={GUEST_USER_ID} />
    </div>
  );
};

export default MyOrders;
