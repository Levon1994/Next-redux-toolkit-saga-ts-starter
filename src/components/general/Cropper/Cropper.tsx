import cn from 'classnames';
import { FC, useRef } from 'react';
import ReactCropper, { ReactCropperElement } from 'react-cropper';

import { Button } from '@/components/general/Button';

import styles from './Cropper.module.scss';

type Props = {
  className?: string;
  onCrop: (value: string) => void;
  src: string;
  id: string;
};

export const Cropper: FC<Props> = ({ className, onCrop, src, id }) => {
  const cropperRef = useRef<ReactCropperElement | null>(null);

  const cropImage = (): void => {
    const imageElement = cropperRef.current;

    if (cropperRef && imageElement) {
      if (typeof imageElement.cropper.getCroppedCanvas() === 'undefined') return;

      onCrop(imageElement.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className={cn(styles.cropper, className)}>
      <ReactCropper zoomable={false} movable={false} guides={false} ref={cropperRef} src={src} />

      <div className={styles.cropper__buttons}>
        <Button onClick={cropImage} id={`cropper-${id}-save-button`}>
          Save
        </Button>
      </div>
    </div>
  );
};
