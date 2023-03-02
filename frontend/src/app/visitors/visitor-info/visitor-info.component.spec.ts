import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorInfoComponent } from './visitor-info.component';

describe('VisitorInfoComponent', () => {
  let component: VisitorInfoComponent;
  let fixture: ComponentFixture<VisitorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
