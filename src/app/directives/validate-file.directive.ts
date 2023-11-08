import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FileExtension, FileSize } from '../enums/file-enum';
import { FileValidator } from '../utils/file-validations.util';
import { FileValidateModel } from '../models/file.model';

@Directive({
  selector: '[appValidateFile]',
})
export class ValidateFileDirective {
  @Input({ required: true }) allowedExtensions: string[] = [FileExtension.CSV];
  @Input({ required: true }) maxSizeMB: number = FileSize['1MB'];
  @Output() validateFile = new EventEmitter<FileValidateModel>();

  constructor() {}

  @HostListener('change', ['$event.target.files'])
  onChange(files: FileList): void {
    if (!files || !files.length) return;
    const file = files.item(0);
    if (!file) return;
    const fileValidator: FileValidator = new FileValidator(
      this.allowedExtensions,
      this.maxSizeMB
    );
    const validation: FileValidateModel = fileValidator.validate(file);
    this.validateFile.emit(validation);
  }
}
