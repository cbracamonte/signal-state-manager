import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingSettingsComponent } from './mapping-settings.component';

describe('MappingSettingsComponent', () => {
  let component: MappingSettingsComponent;
  let fixture: ComponentFixture<MappingSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MappingSettingsComponent]
    });
    fixture = TestBed.createComponent(MappingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
