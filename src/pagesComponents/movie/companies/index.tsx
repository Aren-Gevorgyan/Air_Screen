import React, { FC } from 'react';
import styles from './styles.module.scss';
import { ProductionCompaniesType } from '@/assets/types';
import { useTranslations } from 'next-intl';

type Props = {
  companies: Array<ProductionCompaniesType>;
};

const Companies: FC<Props> = ({ companies }) => {
  const t = useTranslations("Words");
  const title = companies?.length > 1 ? t('companies') : t('company');
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
