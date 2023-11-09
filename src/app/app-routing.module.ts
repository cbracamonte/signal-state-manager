import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dataset',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./upload-file/upload-file.component').then(
        (m) => m.UploadFileComponent
      ),
  },
  {
    path: 'dataset',
    loadChildren: () =>
      import('./dataset-wizard/dataset-wizard.module').then(
        (m) => m.DatasetWizardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
