import cn from 'classnames';
import debounce from 'lodash/debounce';
import { ChangeEvent, FC, useCallback } from 'react';
import { IoIosSearch, IoMdCloseCircle } from 'react-icons/io';

import { ReactIcon } from '@/components/general/ReactIcon';
import { UiSizeLayout } from '@/components/layouts/UiSizeLayout';

import styles from './InputSearch.module.scss';

import { UiElementHeightType, UiElementWidthType } from '@/types/ui';

type Props = {
  placeholder?: string;
  onIconClick?: () => void;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  height?: UiElementHeightType;
  width?: UiElementWidthType;
  value: string;
  name: string;
  id: string;
};

export const InputSearch: FC<Props> = ({
  placeholder = 'Search...',
  onIconClick,
  className,
  onChange,
  onClear,
  height = 'md',
  width,
  value,
  name,
  id,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(
    debounce((query) => onChange(query), 100),
    [onChange]
  );

  const debouncedChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => delayedQuery(e.target.value);

  return (
    <UiSizeLayout width={width} height={height}>
      <div
        className={cn(
          styles.inputSearch,
          {
            [styles[`inputSearch_clearWrapper_${height}`]]: height && onClear,
            [styles[`inputSearch_iconWrapper_${height}`]]: height,
          },
          className
        )}
      >
        <div
          className={cn(styles.inputSearch__iconWrapper, {
            [styles[`inputSearch__iconWrapper_${height}`]]: height,
          })}
          onClick={onIconClick}
          style={{ ...(onIconClick && { cursor: 'pointer' }) }}
        >
          <ReactIcon>
            <IoIosSearch />
          </ReactIcon>
        </div>

        <input
          autoComplete="off"
          placeholder={placeholder}
          onChange={debouncedChangeHandler}
          value={value}
          type="text"
          name={name}
          id={id}
        />

        {value && onClear && (
          <div
            className={cn(styles.inputSearch__clearIconWrapper, {
              [styles[`inputSearch__clearIconWrapper_${height}`]]: height,
            })}
            onClick={onClear}
          >
            <ReactIcon size="lg">
              <IoMdCloseCircle />
            </ReactIcon>
          </div>
        )}
      </div>
    </UiSizeLayout>
  );
};
