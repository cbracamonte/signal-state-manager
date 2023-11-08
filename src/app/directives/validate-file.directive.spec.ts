import { Component, DebugElement } from '@angular/core';
import { ValidateFileDirective } from './validate-file.directive';
import { FileExtension, FileSize } from '../enums/file-enum';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Mock FileList
function createMockFileList(files: File[]): FileList {
  return {
    item: (index: number) => files[index] || null,
    ...files,
  } as FileList;
}

// Mock Component to test directive
@Component({
  template: `<input
    type="file"
    appValidateFile
    [allowedExtensions]="allowedExtensions"
    [maxSizeMB]="maxSizeMB"
    (validFile)="onValidFile($event)"
    (invalidFile)="onInvalidFile($event)"
  />`,
})
class TestFileComponent {
  allowedExtensions = [FileExtension.CSV];
  maxSizeMB = FileSize['1MB']; 
  onValidFile(event: File) {}
  onInvalidFile(event: { status: boolean; message: string }) {}
}

describe('ValidateFileDirective', () => {
  let component: TestFileComponent;
  let fixture: ComponentFixture<TestFileComponent>;
  let inputEl: DebugElement;
  let directive: ValidateFileDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestFileComponent, ValidateFileDirective],
    });
    fixture = TestBed.createComponent(TestFileComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input[type="file"]'));
    directive = inputEl.injector.get(ValidateFileDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  xit('should emit validFile event for a valid file', () => {
    // spyOn(directive, 'validFile').and.callThrough();
    // spyOn(component, 'onValidFile').and.callThrough();
    // const blob = new Blob([""], { type: 'application/csv' });
    // const file = new File([blob], 'example.csv', { type: 'text/csv' });
    // const mockFileList = createMockFileList([file]);
    // const event = { target: { files: mockFileList } };
    // inputEl.nativeElement.dispatchEvent(new Event('change'));
    // inputEl.triggerEventHandler('change', event); 
    // component.onValidFile(file);
    // fixture.detectChanges();
    // expect(component.onValidFile).toHaveBeenCalledOnceWith(file);
  });

  xit('should not emit validFile event for a file with invalid extension', () => {
    spyOn(component, 'onInvalidFile');
    const file = new File([''], 'example.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } };
    inputEl.triggerEventHandler('change', event);
    fixture.detectChanges();
    expect(component.onInvalidFile).toHaveBeenCalledWith({
      status: true,
      message: 'Invalid file extension',
    });
  });

  xit('should not emit validFile event for a file with size greater than maxSizeMB', () => {
    spyOn(component, 'onInvalidFile');
    // Create a mock file of 2MB
    const blob = new Blob(['a'.repeat(2 * 1024 * 1024)], { type: 'text/csv' });
    const file = new File([blob], 'too-large.csv', { type: 'text/csv' });
    const event = { target: { files: [file] } };
    inputEl.triggerEventHandler('change', event);
    fixture.detectChanges();
    expect(component.onInvalidFile).toHaveBeenCalledWith({
      status: true,
      message: 'Invalid file size',
    });
  });
});
