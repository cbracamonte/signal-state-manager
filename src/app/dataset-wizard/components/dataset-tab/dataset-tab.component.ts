import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasetTabModel } from '../../models/dataset-tab.model';
import { DatasetStatusEnum } from '../../enums/dataset.enum';

@Component({
  selector: 'app-dataset-tab',
  templateUrl: './dataset-tab.component.html',
  styleUrls: ['./dataset-tab.component.scss'],
})
export class DatasetTabComponent {
  @Input() tab!: DatasetTabModel;
  @Output() selectTab: EventEmitter<number> = new EventEmitter();

  datasetStatus = DatasetStatusEnum;
  setActiveTab(idTab: number): void {
    this.selectTab.emit(idTab);
  }
}
