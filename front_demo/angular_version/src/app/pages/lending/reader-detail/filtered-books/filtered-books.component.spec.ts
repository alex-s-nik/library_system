import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredBooksComponent } from './filtered-books.component';

describe('FilteredBooksComponent', () => {
  let component: FilteredBooksComponent;
  let fixture: ComponentFixture<FilteredBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilteredBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
