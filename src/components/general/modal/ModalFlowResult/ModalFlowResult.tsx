import cn from 'classnames';
import { FC } from 'react';

import { Button } from '@/components/general/Button';
import { ModalActionsTemplate } from '@/components/general/modal/ModalActionsTemplate';
import { ModalContentTemplate } from '@/components/general/modal/ModalContentTemplate';
import { StatusCard } from '@/components/general/StatusCard';
import { Typography } from '@/components/general/Typography';

import styles from './ModalFlowResult.module.scss';

interface IModalFlowResultData {
  title: string;
  value: string | number;
}

interface IDialogLabel {
  title: string;
  value: string;
}

export type Props = {
  closeDialogHandler: () => void;
  dialogLabel?: IDialogLabel;
  statusText?: string;
  className?: string;
  results?: IModalFlowResultData[];
  title: string;
  type: 'success' | 'error';
};

export const ModalFlowResult: FC<Props> = ({
  closeDialogHandler,
  dialogLabel,
  statusText,
  className,
  results,
  title,
  type,
}) => {
  return (
    <ModalContentTemplate onClose={closeDialogHandler} title={title}>
      <div className={cn(styles.modalFlowResult, className)}>
        {statusText && <StatusCard className={styles.modalFlowResult__statusCard} status={type} text={statusText} />}

        {dialogLabel && (
          <Typography variant="body2">
            {dialogLabel.title} {dialogLabel.value}
          </Typography>
        )}

        {results && !!results.length && (
          <>
            {results.map((aResult) => {
              return (
                <div className={styles.modalFlowResult__resultItem} key={aResult.title}>
                  <Typography variant="subtitle3">{aResult.title}</Typography>

                  <Typography>{aResult.value}</Typography>
                </div>
              );
            })}
          </>
        )}
      </div>

      <ModalActionsTemplate noPadding>
        <Button height="lg" variant="contained" onClick={closeDialogHandler} id="result-button">
          Continue
        </Button>
      </ModalActionsTemplate>
    </ModalContentTemplate>
  );
};
