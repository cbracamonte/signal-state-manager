export enum FileExtension {
  'CSV' = '.csv',
  'PDF' = '.pdf',
}

export enum FileSize {
  '100KB' = 100 * 1024,
  '512KB' = 512 * 1024,
  '1MB' = 1 * 1024 * 1024,
  '5MB' = 5 * 1024 * 1024,
  '10MB' = 10 * 1024 * 1024,
}

export enum FileErrorMessages {
  ERROR_EXTENSION = 'File size extension is not allowed. Only allowed: ',
  ERROR_SIZE = 'File size exceeded. Max. File Size: ',
}
