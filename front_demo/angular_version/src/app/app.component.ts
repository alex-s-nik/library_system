import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AcquisitionComponent } from './pages/acquisition/acquisition.component';
import { LendingComponent } from './pages/lending/lending.component';
import { MainComponent  } from './pages/main/main.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ReaderComponent } from './pages/lending/reader/reader.component';

import { MenuComponent } from './pages/_shared/menu/menu.component';

import { LibraryService } from './library.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AcquisitionComponent,
    LendingComponent,
    MainComponent,
    MenuComponent,
    ReportsComponent,
    ReaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit{
  constructor(private libraryService: LibraryService) { 
  }
  ngOnInit(): void {
    this.libraryService.loadInitialDB();
  }
}
