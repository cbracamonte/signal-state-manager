import { Component } from '@angular/core';
import { DatasetService } from '../../services/dataset.service';
import { DatasetTabModel, WizardDataset } from '../../models/dataset-tab.model';
import { Observable } from 'rxjs';
import { DatasetStatusEnum, DatasetStepEnum } from '../../enums/dataset.enum';

@Component({
  selector: 'app-dataset-wizard',
  templateUrl: './dataset-wizard.component.html',
  styleUrls: ['./dataset-wizard.component.scss'],
})
export class DatasetWizardComponent {
  tabs$: Observable<DatasetTabModel[]>;
  wizardDataset$: Observable<WizardDataset>;
  step: DatasetStepEnum = DatasetStepEnum.DATA_SETTINGS;
  dataSetStep = DatasetStepEnum;
  constructor(private datasetService: DatasetService) {
    this.tabs$ = this.datasetService.tabs$;
    this.wizardDataset$ = this.datasetService.wizardDataset$;
  }

  selectTab(tab: DatasetTabModel): void {
    this.datasetService.updateTabStatus(tab.id, DatasetStatusEnum.IN_PROGRESS);
    this.step = tab.step as DatasetStepEnum;
  }

  saveAsDraft(event: any): void {
    const wizardState: WizardDataset = event as WizardDataset;
    this.datasetService.updateWizardState(wizardState);
  }
}
