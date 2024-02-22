import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksForLendingComponent } from './books-for-lending.component';

describe('BooksForLendingComponent', () => {
  let component: BooksForLendingComponent;
  let fixture: ComponentFixture<BooksForLendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksForLendingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksForLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
