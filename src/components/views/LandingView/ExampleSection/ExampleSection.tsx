import { FC } from 'react';

import { ExampleForm } from './ExampleForm';
import styles from './ExampleSection.module.scss';
import { ExampleViewCard } from './ExampleViewCard';
import { InfiniteScrollExampleSmart } from './InfiniteScrollExampleSmart';
import { ModalFlowExampleSmart } from './ModalFlowExampleSmart';
import { NotificationExample } from './NotificationExample';
import { PaginationExampleSmart } from './PaginationExampleSmart';
import { SimpleModalSmart } from './SimpleModalSmart';

export const ExampleSection: FC = () => {
  return (
    <div className={styles.exampleSection}>
      <div className={styles.exampleSection__containerWrapper}>
        <ExampleViewCard title="Working with simple modal">
          <SimpleModalSmart />
        </ExampleViewCard>

        <ExampleViewCard title="Working with modal flow">
          <ModalFlowExampleSmart />
        </ExampleViewCard>

        <ExampleViewCard title="Working with notification">
          <NotificationExample />
        </ExampleViewCard>

        <ExampleViewCard title="Working with pagination">
          <PaginationExampleSmart />
        </ExampleViewCard>

        <ExampleViewCard title="Infinite scroll example">
          <InfiniteScrollExampleSmart />
        </ExampleViewCard>
      </div>

      <div className={styles.exampleView__containerWrapper}>
        <ExampleForm onSubmit={(values) => console.debug(values)} />
      </div>
    </div>
  );
};
