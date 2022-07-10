import cn from 'classnames';
import { ChangeEvent, FC } from 'react';
import ReactCodeInput from 'react-code-input';

import styles from './InputCode.module.scss';

type Props = {
  className?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
};

export const InputCode: FC<Props> = ({ className, onChange, disabled, value, id }) => {
  return (
    <div className={cn(styles.inputCode, className)} id={id}>
      <ReactCodeInput
        className={styles.inputCode__field}
        onChange={onChange}
        disabled={disabled}
        fields={4}
        value={value}
        type="number"
      />
    </div>
  );
};
