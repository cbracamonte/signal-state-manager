import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dataset-header',
  templateUrl: './dataset-header.component.html',
  styleUrls: ['./dataset-header.component.scss'],
})
export class DatasetHeaderComponent {
  @Output() saveAsDraft = new EventEmitter<void>();
  @Output() exit = new EventEmitter<void>();


  onSaveAsDraft() {
    this.saveAsDraft.emit();
  }

  onExit() {
    this.exit.emit();
  }
}
