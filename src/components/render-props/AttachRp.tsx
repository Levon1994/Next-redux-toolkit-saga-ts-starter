import isImage from 'is-image';
import Downloader from 'js-file-downloader';
import Prettysize from 'prettysize';
import { FC, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { acceptedImageFormats, IMAGE_MAX_SIZE } from '@/configs/formats';

import { toBase64 } from '@/utils/to-base-64';

interface IAccept {
  displayName: string;
  format: string;
}

type Props = {
  base64Image?: boolean;
  valueNames?: Record<string, any>;
  withFile?: boolean;
  minSize?: number;
  onChange: (files: Record<string, any>[] | null) => void;
  base64?: boolean;
  maxSize: number;
  accept?: IAccept[];
  render: (props: Record<string, any>) => void;
  value: File[];
};

interface INewFile {
  base64: unknown | string | undefined;
  file: File;
  name: string;
  size: number;
  id: number;
}

export const AttachRp: FC<Props> = ({
  base64Image,
  valueNames,
  onChange,
  withFile,
  maxSize = IMAGE_MAX_SIZE,
  minSize = 1,
  accept = [...acceptedImageFormats],
  base64,
  render,
  value,
}) => {
  const [files, setFiles] = useState<Record<string, any>[] | []>([]);
  const [id, setId] = useState<number>(1);

  useEffect(() => {
    if (value !== null && value.length) {
      let fileId = id;

      const sizeKey = (valueNames && valueNames.size) || 'size';
      const files = value.map((file: File) => ({
        name: file[(valueNames && valueNames.name) || 'name'],
        size: typeof file[sizeKey] === 'string' ? file[sizeKey] : Prettysize(file[sizeKey]),
        id: fileId++,
      }));

      setId(fileId);
      setFiles(files);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, valueNames]);

  useEffect(() => {
    if (value === null && files.length) setFiles([]);
  }, [value, files.length]);

  const addFile = async (file: File): Promise<void> => {
    const newFile = {
      name: file.name,
      size: Prettysize(file.size),
      id,
    } as INewFile;

    if (base64) {
      const base64String = await toBase64(file);

      newFile.base64 = base64String;
    }
    if (base64Image && isImage(file.name)) {
      const base64String = await toBase64(file);

      newFile.base64 = base64String;
    }

    if (withFile) newFile.file = file;

    const newFiles = [...files, newFile];

    setFiles(newFiles);
    setId(id + 1);

    if (onChange) onChange(newFiles);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: async (acceptedFiles, notAcceptedFiles) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];

        await addFile(file);
      } else if (notAcceptedFiles.length) {
        console.error('file error');
      }
    },
    ...(accept && { accept: accept.map((item) => item.format).join(', ') }),
    noClick: true,
    minSize,
    maxSize,
    noDrag: true,
  });

  const handleDelete = (deletedId: string): void => {
    const newFiles = [...files].filter((item: Record<string, any>) => item.id !== deletedId);

    setFiles(newFiles);

    if (onChange) onChange(newFiles.length ? newFiles : null);
  };
  const downloadFile = (url: string): void => {
    new Downloader({
      filename: url,
      url,
    })
      .then(function () {
        return;
      })
      .catch(function (error: string) {
        console.error(error);
      });
  };

  return (
    // TODO: Delete @ts-ignore after lib will be updated
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div {...getRootProps()} style={{ outline: 'none' }}>
      <input {...getInputProps()} />

      {render({
        onDownload: downloadFile,
        onDelete: handleDelete,
        onOpen: open,
        files,
      })}
    </div>
  );
};
