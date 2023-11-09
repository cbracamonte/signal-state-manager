import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasetWizardComponent } from './page/dataset-wizard/dataset-wizard.component';

const routes: Routes = [
  {
    path: '',
    component: DatasetWizardComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasetWizardRoutingModule { }
