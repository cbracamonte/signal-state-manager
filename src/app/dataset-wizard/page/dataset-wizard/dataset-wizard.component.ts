import { Component } from '@angular/core';
import { DatasetService } from '../../services/dataset.service';
import { DatasetTabModel } from '../../models/dataset-tab.model';
import { Observable } from 'rxjs';
import { DatasetStatusEnum, DatasetStepEnum } from '../../enums/dataset.enum';

@Component({
  selector: 'app-dataset-wizard',
  templateUrl: './dataset-wizard.component.html',
  styleUrls: ['./dataset-wizard.component.scss'],
})
export class DatasetWizardComponent {
  tabs$: Observable<DatasetTabModel[]> = this.datasetService.tabs$;
  step: DatasetStepEnum = DatasetStepEnum.DATA_SETTINGS;
  dataSetStep = DatasetStepEnum;
  constructor(private datasetService: DatasetService) {}

  selectTab(tab: DatasetTabModel): void {
    this.datasetService.updateTabStatus(tab.id, DatasetStatusEnum.IN_PROGRESS);
    this.step = tab.step as DatasetStepEnum;
  }
}
