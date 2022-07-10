import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/general/Button';
import { ModalContentTemplate } from '@/components/general/modal/ModalContentTemplate';
import { ModalFlow } from '@/components/general/modal/ModalFlow';

import { exampleActions } from '@/store/branches/example/example.slice';
import { modalActions, modalTypes, modalUtils } from '@/store/branches/modal';
import { ModalFlowPrefixNamesEnum } from '@/store/branches/modal/modal.names';

import styles from './styles.module.scss';
import { ModalFlowExampleForm } from '../ModalFlowExampleForm';

export const ModalFlowExampleSmart: FC = () => {
  const dispatch = useDispatch();

  const { id, uuid } = modalUtils.generateModalId(ModalFlowPrefixNamesEnum.EXAMPLE_MODAL_FLOW_NAME);

  const confirm = (
    modalData: Record<string, any>,
    changeModalType: (type: modalTypes.ModalFlowEnum, data?: Record<string, any>) => void
  ): void => {
    const { lat, lon } = modalData;

    changeModalType(modalTypes.ModalFlowEnum.PENDING);
    dispatch(
      exampleActions.getForecastExampleReq({
        modalFlowId: id,
        lat,
        lon,
      })
    );
  };

  const reviewData = (modalData: Record<string, any>): { title: string; value: string }[] => {
    const { lat, lon } = modalData;

    return [
      { title: 'Latitude coordinates', value: lat },
      { title: 'Number of tokens', value: lon },
    ];
  };

  return (
    <>
      <div>
        <Button
          onClick={() =>
            dispatch(
              modalActions.openModalFlow({ modalId: id, modalType: modalTypes.ModalFlowEnum.FORM, modalData: { uuid } })
            )
          }
          id="modal-flow-test"
        >
          Open modal flow
        </Button>
      </div>

      <ModalFlow
        modalConfig={{
          form: {
            render: ({ modalEvents }) => {
              return (
                <ModalContentTemplate onClose={modalEvents.clearCloseModal} title="Modal flow test form">
                  <ModalFlowExampleForm onSubmit={modalEvents.changeModalType} onClose={modalEvents.clearCloseModal} />
                </ModalContentTemplate>
              );
            },
          },
          review: {
            reviewViewProps: ({ modalData, modalEvents }) => ({
              closeDialogHandler: () => modalEvents.clearCloseModal(),
              confirmButtonLabel: 'Confirm',
              actionHandler: () => confirm(modalData, modalEvents.changeModalType),
              cancelHandler: () => modalEvents.changeModalType(modalTypes.ModalFlowEnum.FORM),
              reviewData: reviewData(modalData),
              title: 'Modal flow test form review',
            }),
          },
          result: {
            resultViewProps: ({ modalData, modalType, modalEvents }) => ({
              closeDialogHandler: () => modalEvents.clearCloseModal(),
              statusText: modalType === modalTypes.ModalFlowEnum.SUCCESS ? `Success mock` : `Error mock`,
              results: reviewData(modalData),
              title: modalType === modalTypes.ModalFlowEnum.SUCCESS ? 'Confirmation' : 'Action failed',
              type: modalType === modalTypes.ModalFlowEnum.SUCCESS ? 'success' : 'error',
            }),
          },
        }}
        className={styles.modalFlowExample}
        id={id}
      />
    </>
  );
};
