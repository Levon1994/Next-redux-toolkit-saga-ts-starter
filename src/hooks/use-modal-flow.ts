import { useSelector } from 'react-redux';

import { ModalFlowPrefixNamesEnum } from '@/store/branches/modal/modal.names';
import { getModalFlowState, getModalState } from '@/store/branches/modal/modal.selectors';
import { IModalFlowData, ModalFlowEnum } from '@/store/branches/modal/modal.types';
import { RootState } from '@/store/root.types';

/**
 * Get a hook-function to use with Modal flow and get current modal
 * Removes overhead of manually writing out hooks for modal flows.
 */
export const useModalFlow = (
  modalPrefix: ModalFlowPrefixNamesEnum,
  idName: string
): { modal: IModalFlowData; modalId: string } => {
  const modals = useSelector(getModalState);

  const suitableModalIds = Object.keys(modals).filter((key) => key.includes(modalPrefix));

  const modalId = suitableModalIds.filter(
    (id) => modals[id].modalType !== ModalFlowEnum.CLOSED && idName in modals[id].modalData
  )[0];

  const modal = useSelector((state: RootState) => getModalFlowState(state, modalId));

  return { modal, modalId };
};
