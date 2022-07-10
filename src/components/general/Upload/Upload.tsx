import cn from 'classnames';
import isImage from 'is-image';
import Image from 'next/image';
import Prettysize from 'prettysize';
import { FC, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoIosImage, IoIosTrash, IoMdCloudUpload } from 'react-icons/io';

import { acceptedImageFormats, acceptedVideoFormats, IMAGE_MAX_SIZE, VIDEO_MAX_SIZE } from '@/configs/formats';
import { images } from '@/configs/images';

import { Cropper } from '@/components/general/Cropper';
import { SimpleModal } from '@/components/general/modal/SimpleModal';
import { ReactIcon } from '@/components/general/ReactIcon';
import { Typography } from '@/components/general/Typography';

import { Base64, toBase64 } from '@/utils/to-base-64';

import styles from './Upload.module.scss';

export enum UploadViewEnum {
  DEFAULT_VIEW = 'DEFAULT_VIEW',
  PREVIEW_VIEW = 'PREVIEW_VIEW',
  UPLOAD_VIEW = 'UPLOAD_VIEW',
  ERROR_VIEW = 'ERROR_VIEW',
}

type Props = {
  uploadVideoAction?: (request: Record<string, any>) => Record<string, any> | null;
  imageMaxSize?: number;
  imageMinSize?: number;
  videoMaxSize?: number;
  videoMinSize?: number;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  imageOnly?: boolean;
  isCropper?: boolean;
  className?: string;
  onChange?: (value: Record<string, any> | string | null) => void;
  accept?: {
    displayName: string;
    format: string;
  }[];
  error?: boolean;
  title?: string;
  value: string;
};

export const Upload: FC<Props> = ({
  uploadVideoAction,
  imageMaxSize = IMAGE_MAX_SIZE,
  imageMinSize = 1,
  videoMaxSize = VIDEO_MAX_SIZE,
  videoMinSize = 1,
  onLoadStart,
  className,
  onLoadEnd,
  isCropper,
  imageOnly,
  onChange,
  accept = [...acceptedImageFormats, ...acceptedVideoFormats],
  value,
  title,
  error,
}) => {
  const [errorMess, setErrorMess] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [cropper, setCropper] = useState<string | null>(null);
  const [view, setView] = useState<string>(UploadViewEnum.DEFAULT_VIEW);

  useEffect(() => {
    if (value) {
      setPreview(value);
      setView(UploadViewEnum.PREVIEW_VIEW);
    }
  }, [value, setPreview, setView]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    // eslint-disable-next-line sonarjs/cognitive-complexity
    onDrop: async (acceptedFiles, notAcceptedFiles) => {
      setErrorMess('');

      if (acceptedFiles.length) {
        // If file accept
        const file = acceptedFiles[0];

        if (!isImageFile(file) && imageOnly) {
          setView(UploadViewEnum.ERROR_VIEW);

          return;
        }

        if (!isAcceptedSize(file)) {
          setView(UploadViewEnum.ERROR_VIEW);

          return;
        }
        // Upload
        let base64: Base64 = null;
        let res: Record<string, any> | null = null;

        if (isCropper && isImageFile(file)) {
          base64 = await toBase64(file);

          typeof base64 === 'string' && setCropper(base64);

          return;
        }

        if (imageOnly) {
          base64 = await toBase64(file);
        } else {
          setView(UploadViewEnum.UPLOAD_VIEW);

          if (onLoadStart) onLoadStart();

          try {
            if (uploadVideoAction) {
              res = uploadVideoAction({
                data: file,
                onUploadProgress: (value: number) => {
                  setProgress(value);
                },
              });
            }

            if (isImageFile(file)) {
              base64 = await toBase64(file);
            } else {
              base64 = images.transCodingImage;
            }
          } catch (error) {
            setErrorMess((error as Record<string, any>).file[0]);
            setView(UploadViewEnum.ERROR_VIEW);

            return;
          } finally {
            setProgress(0);

            if (onLoadEnd) onLoadEnd();
          }
        }

        typeof base64 === 'string' && setPreview(base64);

        setView(UploadViewEnum.PREVIEW_VIEW);

        if (onChange) onChange(res || base64);
      } else if (notAcceptedFiles.length) {
        setView(UploadViewEnum.ERROR_VIEW);
      }
    },

    ...(accept && { accept: accept.map((item) => item.format).join(', ') }),
  });

  const isImageFile = (file: Record<string, any>): boolean => /^image/.test(file.type);

  const isBase64 = (file: string): boolean => /^data:/.test(file);

  const isAcceptedSize = (file: Record<string, any>): boolean => {
    let result = false;

    if (isImageFile(file)) {
      if (file.size >= imageMinSize && file.size <= imageMaxSize) result = true;
    } else {
      if (file.size >= videoMinSize && file.size <= videoMaxSize) result = true;
    }

    return result;
  };

  const onCrop = (base64: string): void => {
    setPreview(base64);
    setView(UploadViewEnum.PREVIEW_VIEW);
    setCropper(null);

    if (onChange) onChange(base64);
  };

  const handleDeleteButtonClick = (): void => {
    setPreview(null);
    setView(UploadViewEnum.DEFAULT_VIEW);

    if (onChange) onChange(null);
  };

  const renderPreview = (): JSX.Element | null => {
    if (preview) {
      return isBase64(preview) || isImage(preview) ? (
        <Image src={preview || ''} alt="Upload preview" />
      ) : (
        <div>Video player component</div>
      );
    }

    return null;
  };

  return (
    <>
      <div {...getRootProps()} style={{ outline: 'none' }}>
        <input {...getInputProps()} />

        <div
          className={cn(
            styles.upload,
            {
              [styles[`upload_view_${view}`]]: view,
              [styles.upload_active]: isDragActive,
              [styles.upload_error]: error,
            },
            className
          )}
        >
          {view === UploadViewEnum.DEFAULT_VIEW && (
            <div className={styles.upload__view}>
              <ReactIcon className="upload__icon" size="xxl" color="primary">
                <IoIosImage />
              </ReactIcon>

              <div className={styles.upload__title}>
                <Typography variant="subtitle2">{title || 'Drop an Image/Video here or select file.'}</Typography>
              </div>

              <div className={styles.upload__description}>
                <Typography variant="body3">
                  Image: {acceptedImageFormats.map((item) => item.displayName).join(', ')}. Max size{' '}
                  {Prettysize(imageMaxSize)}.
                </Typography>
              </div>

              {!imageOnly && (
                <div className={styles.upload__description}>
                  <Typography variant="body3">
                    Video: {acceptedVideoFormats.map((item) => item.displayName).join(', ')}. Max size{' '}
                    {Prettysize(videoMaxSize)}.
                  </Typography>
                </div>
              )}
            </div>
          )}

          {view === UploadViewEnum.UPLOAD_VIEW && (
            <div className={styles.upload__view}>
              <div className={styles.upload__title}>
                <Typography variant="body2">Processing</Typography>
              </div>

              <div className={styles.upload__progress}>
                <div style={{ width: `${progress}%` }} />
              </div>

              <div className={styles.upload__description}>
                <Typography variant="body3">
                  Feel free to move on- your video will appear here when oit is ready.
                </Typography>
              </div>
            </div>
          )}

          {view === UploadViewEnum.ERROR_VIEW && (
            <div className={styles.upload__view}>
              <div className={styles.upload__title}>
                <Typography variant="body3">
                  Oops, Upload failed.
                  <Typography color="error" variant="body3" component="span">
                    Try again?
                  </Typography>
                </Typography>
              </div>

              <div className={styles.upload__description}>
                <Typography variant="body3" color="error">
                  {errorMess || 'Oh no, there is some error in uploading. Please try again.'}
                </Typography>
              </div>

              <div className={styles.upload__description}>
                <Typography variant="body3">
                  Image: {acceptedImageFormats.map((item) => item.displayName).join(', ')}. Max size{' '}
                  {Prettysize(imageMaxSize)}.
                </Typography>
              </div>

              {!imageOnly && (
                <div className={styles.upload__description}>
                  <Typography variant="body3">
                    Video: {acceptedVideoFormats.map((item) => item.displayName).join(', ')}. Max size
                    {Prettysize(videoMaxSize)}.
                  </Typography>
                </div>
              )}
            </div>
          )}

          {view === UploadViewEnum.PREVIEW_VIEW && (
            <div className={styles.upload__preview} onClick={(e) => e.stopPropagation()}>
              <div className={styles.upload__previewButtons}>
                <ReactIcon pointer onClick={open} color="primaryDark" size="lg">
                  <IoMdCloudUpload />
                </ReactIcon>

                <ReactIcon pointer onClick={handleDeleteButtonClick} color="primaryDark" size="lg">
                  <IoIosTrash />
                </ReactIcon>
              </div>

              {renderPreview()}
            </div>
          )}
        </div>
      </div>

      <SimpleModal width="sm" onClose={() => setCropper(null)} isOpenCustom={!!cropper} id="upload-custom-modal">
        <Cropper onCrop={onCrop} src={cropper || ''} id="upload" />
      </SimpleModal>
    </>
  );
};
