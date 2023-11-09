import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetWizardComponent } from './dataset-wizard.component';

describe('DatasetWizardComponent', () => {
  let component: DatasetWizardComponent;
  let fixture: ComponentFixture<DatasetWizardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetWizardComponent]
    });
    fixture = TestBed.createComponent(DatasetWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
