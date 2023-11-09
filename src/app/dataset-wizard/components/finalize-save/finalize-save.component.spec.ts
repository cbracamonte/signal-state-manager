import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizeSaveComponent } from './finalize-save.component';

describe('FinalizeSaveComponent', () => {
  let component: FinalizeSaveComponent;
  let fixture: ComponentFixture<FinalizeSaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizeSaveComponent]
    });
    fixture = TestBed.createComponent(FinalizeSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
