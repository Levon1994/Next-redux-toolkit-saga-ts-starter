import { FC, ReactElement, useState } from 'react';

type Props = {
  defaultValue?: boolean;

  render: (props: { toggleBool: () => void; boolValue: boolean }) => ReactElement;
};

export const BoolRp: FC<Props> = ({ defaultValue, render }) => {
  const [isTrue, setValue] = useState(defaultValue || false);

  const toggleBool = (): void => {
    setValue(!isTrue);
  };

  return render({ boolValue: isTrue, toggleBool });
};
