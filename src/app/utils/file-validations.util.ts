import { FileErrorMessages, FileSize } from '../enums/file-enum';
import { FileValidateModel } from '../models/file.model';

export class FileValidator {
  constructor(private allowedExtensions: string[], private maxSizeMB: number) {}

  public validate(file: File): FileValidateModel {
    const isExtensionValid = this.isValidFileExtension(file);
    const isSizeValid = this.isValidFileSize(file);

    if (!isExtensionValid) {
      return {
        isValid: false,
        errorMessage: `${
          FileErrorMessages.ERROR_EXTENSION
        }${this.allowedExtensions.join(', ')}`,
        file,
      };
    }

    if (!isSizeValid) {
      return {
        isValid: false,
        errorMessage: `${FileErrorMessages.ERROR_SIZE}${
          FileSize[this.maxSizeMB]
        }`,
        file,
      };
    }

    return { isValid: true, errorMessage: '', file };
  }

  private isValidFileExtension(file: File): boolean {
    return this.allowedExtensions.some((ext) => file.name.endsWith(ext));
  }

  private isValidFileSize(file: File): boolean {
    return file.size <= this.maxSizeMB;
  }
}
