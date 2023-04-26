import { BookListComponent } from './book/components/book-list/book-list.component';
import { NewbookComponent } from './book/components/newbook/newbook.component';
import { ReadBookComponent } from './book/components/read-book/read-book.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule),
  },
  {
    path: 'newbook',
    component: NewbookComponent,
  },
  {
    path: 'list',
    component: BookListComponent,
  },
  {
    path: 'readbook',
    component: ReadBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
