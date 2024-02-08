import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AcquisitionComponent } from './pages/acquisition/acquisition.component';
import { LendingComponent } from './pages/lending/lending.component';
import { MainComponent  } from './pages/main/main.component';
import { ReportsComponent } from './pages/reports/reports.component';

import { MenuComponent } from './pages/_shared/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AcquisitionComponent,
    LendingComponent,
    MainComponent,
    MenuComponent,
    ReportsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'angular_version';
}
