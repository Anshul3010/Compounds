import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundListComponent } from './compound-list.component';

describe('CompoundListComponent', () => {
  let component: CompoundListComponent;
  let fixture: ComponentFixture<CompoundListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompoundListComponent]
    });
    fixture = TestBed.createComponent(CompoundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
