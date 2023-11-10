import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WizardDataset } from '../../models/dataset-tab.model';

@Component({
  selector: 'app-dataset-header',
  templateUrl: './dataset-header.component.html',
  styleUrls: ['./dataset-header.component.scss'],
})
export class DatasetHeaderComponent {
  @Input() wizardDataset!: WizardDataset | null;
  @Output() saveAsDraft = new EventEmitter<WizardDataset>();
  @Output() exit = new EventEmitter<void>();


  onSaveAsDraft() {
    this.saveAsDraft.emit(this.wizardDataset!);
  }

  onExit() {
    this.exit.emit();
  }
}
