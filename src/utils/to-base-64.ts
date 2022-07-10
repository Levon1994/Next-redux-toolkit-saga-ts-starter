export type Base64 = string | ArrayBuffer | null;

/**
 * Convert file to base64 format
 */
export const toBase64 = (file: File | Blob): Promise<Base64> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });
};
