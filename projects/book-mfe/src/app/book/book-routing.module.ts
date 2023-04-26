import { BookListComponent } from './components/book-list/book-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewbookComponent } from './components/newbook/newbook.component';
import { ReadBookComponent } from './components/read-book/read-book.component';

const routes: Routes = [
  {
    path: 'list',
    component: BookListComponent,
  },
  {
    path: 'newbook',
    component: NewbookComponent,
  },
  {
    path: 'readbook',
    component: ReadBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
