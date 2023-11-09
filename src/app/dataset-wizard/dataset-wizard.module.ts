import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetWizardComponent } from './page/dataset-wizard/dataset-wizard.component';
import { DatasetWizardRoutingModule } from './dataset-wizard-routing.module';
import { DatasetHeaderComponent } from './components/dataset-header/dataset-header.component';
import { DatasetTabComponent } from './components/dataset-tab/dataset-tab.component';
import { DataSettingsComponent } from './components/data-settings/data-settings.component';
import { MappingSettingsComponent } from './components/mapping-settings/mapping-settings.component';
import { DataValidationComponent } from './components/data-validation/data-validation.component';
import { FinalizeSaveComponent } from './components/finalize-save/finalize-save.component';



@NgModule({
  declarations: [
    DatasetWizardComponent,
    DatasetHeaderComponent,
    DatasetTabComponent,
    DataSettingsComponent,
    MappingSettingsComponent,
    DataValidationComponent,
    FinalizeSaveComponent
  ],
  imports: [
    CommonModule,
    DatasetWizardRoutingModule
  ]
})
export class DatasetWizardModule { }
