import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetTabComponent } from './dataset-tab.component';

describe('DatasetTabComponent', () => {
  let component: DatasetTabComponent;
  let fixture: ComponentFixture<DatasetTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetTabComponent]
    });
    fixture = TestBed.createComponent(DatasetTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
