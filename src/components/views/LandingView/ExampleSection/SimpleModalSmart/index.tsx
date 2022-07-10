import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@/components/general/Button';
import { SimpleModal } from '@/components/general/modal/SimpleModal';

import { modalActions } from '@/store/branches/modal';
import { SimpleModalNamesEnum } from '@/store/branches/modal/modal.names';

export const SimpleModalSmart: FC = () => {
  const dispatch = useDispatch();

  const simpleModalName = SimpleModalNamesEnum.EXAMPLE_SIMPLE_MODAL_NAME;

  return (
    <>
      <div>
        <Button
          onClick={() => dispatch(modalActions.openSimpleModal({ name: simpleModalName }))}
          id="simple-modal-test"
        >
          Open simple modal
        </Button>
      </div>

      <SimpleModal title="Modal title" id={simpleModalName}>
        Test modal
      </SimpleModal>
    </>
  );
};
