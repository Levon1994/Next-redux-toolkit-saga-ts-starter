import cn from 'classnames';
import { FC, ReactNode } from 'react';

import { Button } from '@/components/general/Button';
import { ModalActionsTemplate } from '@/components/general/modal/ModalActionsTemplate';
import { ModalContentTemplate } from '@/components/general/modal/ModalContentTemplate';
import { Typography } from '@/components/general/Typography';

import styles from './ModalFlowReviewForm.module.scss';

interface IModalFlowReviewFormData {
  value: string | number;
  title: string;
}

export type Props = {
  confirmButtonLabel?: string;
  closeDialogHandler: () => void;
  editButtonLabel?: string;
  headerMessage?: string | ReactNode;
  footerMessage?: string;
  actionHandler: () => void;
  cancelHandler: () => void;
  reviewData?: IModalFlowReviewFormData[];
  className?: string;
  title: string;
};

export const ModalFlowReviewForm: FC<Props> = ({
  confirmButtonLabel = 'Confirm',
  closeDialogHandler,
  editButtonLabel = 'Edit',
  actionHandler,
  cancelHandler,
  headerMessage,
  footerMessage,
  reviewData,
  className,
  title,
}) => {
  return (
    <ModalContentTemplate onClose={closeDialogHandler} title={title}>
      <div className={cn(styles.modalFlowReviewForm, className)}>
        {!!headerMessage && headerMessage}

        {reviewData && (
          <>
            {reviewData.map((aReviewData) => (
              <div className={styles.modalFlowReviewForm__reviewItem} key={aReviewData.title}>
                <Typography variant="subtitle3" component="p">
                  {aReviewData.title}
                </Typography>

                <Typography>{aReviewData.value}</Typography>
              </div>
            ))}
          </>
        )}

        {!!footerMessage && footerMessage}
      </div>

      <ModalActionsTemplate noPadding>
        <Button height="lg" variant="contained" onClick={cancelHandler} id="review-form-edit-button">
          {editButtonLabel}
        </Button>

        <Button height="lg" variant="contained" onClick={actionHandler} id="review-form-confirm-button">
          {confirmButtonLabel}
        </Button>
      </ModalActionsTemplate>
    </ModalContentTemplate>
  );
};
