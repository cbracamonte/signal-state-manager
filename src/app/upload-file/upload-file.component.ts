import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExtension, FileSize } from '../enums/file-enum';
import { DirectivesModule } from '../directives/directives.module';
import { FileValidateModel } from '../models/file.model';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule, DirectivesModule],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  fileExtension = FileExtension;
  fileSize = FileSize;

  onValidateFile(event: any): void {
    const validation = event as FileValidateModel;
    console.log('onValidFile', validation);
  }
}
