import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundComponent } from './compound.component';

describe('CompoundComponent', () => {
  let component: CompoundComponent;
  let fixture: ComponentFixture<CompoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompoundComponent]
    });
    fixture = TestBed.createComponent(CompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
