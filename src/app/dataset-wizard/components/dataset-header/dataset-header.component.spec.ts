import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetHeaderComponent } from './dataset-header.component';

describe('DatasetHeaderComponent', () => {
  let component: DatasetHeaderComponent;
  let fixture: ComponentFixture<DatasetHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetHeaderComponent]
    });
    fixture = TestBed.createComponent(DatasetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
