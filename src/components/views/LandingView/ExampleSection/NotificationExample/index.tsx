import { FC } from 'react';

import { Button } from '@/components/general/Button';

import { successMsg } from '@/services/notifications';

export const NotificationExample: FC = () => {
  return (
    <div>
      <Button onClick={() => successMsg('Message was sent successfully')} id="button-test-toast">
        Test notification
      </Button>
    </div>
  );
};
