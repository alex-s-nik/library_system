import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component'
import { VisitorCardComponent } from './visitors/visitor-card/visitor-card.component'
import { VisitorsComponent } from './visitors/visitors.component'

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'visitors', component: VisitorsComponent },
  { path: 'visitors/:id', component: VisitorCardComponent },
  // {
  //   path: '', component: MainLayoutComponent,
  //   children: [
  //     { path: '', pathMatch: 'full', redirectTo: 'documents' },
  //     { path: 'documents', component: DocumentListComponent, canActivate: [MustBeLoggedIn] },
  //     { path: 'catalogs', component: CatalogListComponent, canActivate: [MustBeLoggedIn] },
  //     { path: 'statuses', component: StatusListComponent, canActivate: [MustBeLoggedIn] },
  //     { path: 'partners', component: PartnerListComponent, canActivate: [MustBeLoggedIn] },
  //     { path: 'users', component: UserListComponent, canActivate: [MustBeLoggedIn] },
  //   ]
  // },
  // { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
