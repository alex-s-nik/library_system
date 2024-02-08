import { Routes } from '@angular/router';

import { AcquisitionComponent } from './pages/acquisition/acquisition.component';
import { LendingComponent } from './pages/lending/lending.component';
import { MainComponent } from './pages/main/main.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        title: 'Главная'
    },
    {
        path: 'acqusition',
        component: AcquisitionComponent,
        title: 'Комплектование'
    },
    {
        path: 'lending',
        component: LendingComponent,
        title: 'Книговыдача'
    },
    {
        path: 'reports',
        component: ReportsComponent,
        title: 'Отчеты'
    }
];
