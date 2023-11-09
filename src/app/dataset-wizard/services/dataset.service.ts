import { Injectable } from '@angular/core';
import { DatasetTabModel } from '../models/dataset-tab.model';
import { BehaviorSubject } from 'rxjs';
import { DatasetStatusEnum, DatasetStepEnum } from '../enums/dataset.enum';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  private wizardState = {
    name: 'My New Dataset',
    schema: {
      domainName: 'Career Schema Standard',
      sections: ['Section One'],
      countries: ['MX', 'US'],
      industries: ['IND01', 'IND02'],
    },
    status: 'IN_DRAFT',
  };

  private initialDatasetTabs: DatasetTabModel[] = [
    {
      id: 1,
      title: 'Dataset Settings',
      description:
        'Configure general info & choose Target Schema model to continue with mapping',
      status: DatasetStatusEnum.IN_PROGRESS,
      isActive: true,
      step: DatasetStepEnum.DATA_SETTINGS
    },
    {
      id: 2,
      title: 'Mapping Settings',
      description:
        'Upload compatible Sample data File and verify Auto-Schema mapping',
      status: DatasetStatusEnum.PENDING,
      isActive: false,
      step: DatasetStepEnum.MAPPING_SETTINGS
    },
    {
      id: 3,
      title: 'Data Validation',
      description: 'Lorem ipsum dolor sit amet, consectetur.',
      status: DatasetStatusEnum.PENDING,
      isActive: false,
      step: DatasetStepEnum.DATA_VALIDATION
    },
    {
      id: 4,
      title: 'Finalize & Save',
      description: 'Lorem ipsum dolor sit amet, consectetur.',
      status: DatasetStatusEnum.PENDING,
      isActive: false,
      step: DatasetStepEnum.FINALIZE_SAVE
    },
  ];
  private tabsSubject = new BehaviorSubject<DatasetTabModel[]>(
    this.initialDatasetTabs
  );
  tabs$ = this.tabsSubject.asObservable();

  constructor() {}

  updateTabStatus(idTab: number, status: DatasetStatusEnum): void {
    let updatedTabs = this.tabsSubject.value;
    const findTab = updatedTabs.findIndex((tab) => tab.id === idTab);
    if (findTab === -1) return;
    updatedTabs = updatedTabs.map((tab, index) => {
      const isBeforeActiveTab = index < findTab;
      const isActiveTab = index === findTab;
      return {
        ...tab,
        status: isActiveTab
          ? status
          : isBeforeActiveTab
          ? DatasetStatusEnum.COMPLETED
          : DatasetStatusEnum.PENDING,

        isActive: isActiveTab,
      };
    });
    this.tabsSubject.next(updatedTabs);
  }

  saveAsDraft(): void {
    console.log('save as draft');
  }

  exit(): void {
    console.log('exit');
  }
}
