/**
 * Accepted image formats for upload
 */
export const acceptedImageFormats = [
  { format: 'image/jpeg', displayName: 'JPG' },
  { format: 'image/png', displayName: 'PNG' },
];

/**
 * Accepted video formats for upload
 */
export const acceptedVideoFormats = [
  { format: 'video/quicktime', displayName: 'MOV' },
  { format: 'video/x-msvideo', displayName: 'AVI' },
  { format: 'video/x-ms-wmv', displayName: 'WMV' },
  { format: 'video/x-flv', displayName: 'FLV' },
  { format: 'video/mpeg', displayName: 'MPEG' },
  { format: 'video/3gpp', displayName: '3GP' },
  { format: 'video/mp4', displayName: 'MP4' },
];

/**
 * Accepted file formats for upload
 */
export const acceptedFileFormats = [
  {
    format: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    displayName: 'word',
  },
  {
    format: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    displayName: 'excel',
  },
  { format: 'application/vnd.ms-powerpoint', displayName: 'powerpoint' },
  { format: 'application/vnd.ms-excel', displayName: 'excel' },
  { format: 'application/msword', displayName: 'word' },
  { format: 'application/pdf', displayName: 'pdf' },
  { format: 'text/plain', displayName: 'txt' },
];

/**
 * Image file max size
 */
export const IMAGE_MAX_SIZE = 1024 * 1024 * 10; // 10MB in bytes

/**
 * Video file max size
 */
export const VIDEO_MAX_SIZE = 1024 * 1024 * 512; // 512MB in bytes
