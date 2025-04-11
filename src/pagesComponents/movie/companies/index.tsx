import React, { FC } from 'react';
import styles from './styles.module.scss';
import { ProductionCompaniesType } from '@/assets/types';
import { useTranslations } from 'next-intl';

type Props = {
  companies: Array<ProductionCompaniesType>;
};

const Companies: FC<Props> = ({ companies }) => {
  const t = useTranslations("Words");
  let data: Array<ProductionCompaniesType> = [];
  let title = t('company');
  if (companies.length > 1) {
    title = t('companies');
    data = companies.slice(0, 3)
  }

  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      <div>
        {data?.map((val) => (
          <span key={val.id} className={styles.item}>
            {val.name} {val.origin_country}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Companies;
