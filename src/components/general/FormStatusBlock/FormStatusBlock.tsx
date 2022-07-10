import cn from 'classnames';
import { FC } from 'react';
import { MdDone, MdError } from 'react-icons/md';

import { FormBlock } from '@/components/general/FormBlock';
import { LinkButton } from '@/components/general/LinkButton';
import { ReactIcon } from '@/components/general/ReactIcon';
import { Typography } from '@/components/general/Typography';

import styles from './FormStatusBlock.module.scss';

type Props = {
  buttonText?: string;
  className?: string;
  backLink?: string;
  status?: boolean;
  text: string;
};

export const FormStatusBlock: FC<Props> = ({ className, buttonText = 'Back', backLink = '/', status = true, text }) => {
  return (
    <div className={cn(styles.formStatusBlock, className)}>
      <FormBlock marginBottom="s6" alignH="center">
        <div
          className={cn(styles.formStatusBlock__icon, {
            [styles.formStatusBlock__icon_error]: !status,
          })}
        >
          {status ? (
            <ReactIcon color="valid" size="xxxl">
              <MdDone />
            </ReactIcon>
          ) : (
            <ReactIcon color="error" size="xxxl">
              <MdError />
            </ReactIcon>
          )}
        </div>
      </FormBlock>

      <FormBlock marginBottom="s6">
        <Typography variant="body1" align="center">
          {text}
        </Typography>
      </FormBlock>

      <LinkButton height="lg" to={backLink} id="form-success-block-link">
        {buttonText}
      </LinkButton>
    </div>
  );
};
