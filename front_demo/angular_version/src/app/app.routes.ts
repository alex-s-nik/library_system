import { Routes } from '@angular/router';

import { AcquisitionComponent } from './pages/acquisition/acquisition.component';
import { LendingComponent } from './pages/lending/lending.component';
import { MainComponent } from './pages/main/main.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ReaderComponent } from './pages/lending/reader/reader.component';
import { WrapperComponent } from './pages/lending/wrapper/wrapper.component';
import { ReaderDetailComponent } from './pages/lending/reader-detail/reader-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReaderFormComponent } from './pages/lending/reader-form/reader-form.component';

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
        title: 'Книговыдача',
        component: LendingComponent,
        children: [
            {
                path: '',
                title: 'Книговыдача',
                component: WrapperComponent
            },
            {
                path: 'reader',
                title: 'Найти читателя',
                component: ReaderComponent,
            },
            {
                path: 'reader/new',
                title: 'Создать читателя',
                component: ReaderFormComponent,
            },
            {
                path: 'reader/:id',
                title: 'Выдача книг',
                component: ReaderDetailComponent,
            }
        ]
    },
    {
        path: 'reports',
        component: ReportsComponent,
        title: 'Отчеты'
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
