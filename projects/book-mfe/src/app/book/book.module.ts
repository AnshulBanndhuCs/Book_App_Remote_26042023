import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { BookClient } from './../../model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './components/book-list/book-list.component';
import { NewbookComponent } from './components/newbook/newbook.component';
import { GenreClient } from '../../model';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReadBookComponent } from './components/read-book/read-book.component';

@NgModule({
  declarations: [BookListComponent, NewbookComponent, ReadBookComponent],
  imports: [CommonModule, BookRoutingModule, FormsModule, EditorModule, CKEditorModule],
  providers: [GenreClient, BookClient],
})
export class BookModule {}
