import React, { FC } from 'react';
import styles from './styles.module.scss';
import { ProductionCompaniesType } from '@/assets/types';

type Props = {
  companies: Array<ProductionCompaniesType>;
};

const Companies: FC<Props> = ({ companies }) => {
  const title = companies?.length > 1 ? 'Ընկերություններ' : 'Ընկերություն';
  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      <div>
        {companies?.map((val) => (
          <span key={val.id} className={styles.item}>
            {val.name} {val.origin_country}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Companies;
