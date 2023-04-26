import { Component, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { BookClient, BookVM } from 'projects/book-mfe/src/model';
import { async } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  Id: string | null | undefined;
  isNew = false;
  public bookList: BookVM[] = [];
  BookDetail: BookVM = new BookVM();
  imgPath!: string;
  ProfileDb = '';
  private baseUrl!: 'https://localhost:7225';

  display = false;
  onPress() {
    this.router.navigate(['books/newbook']);
  }

  constructor(private modelService: BookClient, private router: Router, private senitizer: DomSanitizer) {}

  ngOnInit() {
    // debugger
    this.getAll();
  }

  getAll() {
    // debugger;
    this.modelService.getAllBooks().subscribe(
      async (response) => {
        // this.bookList = response;
        const bList = await response?.data.text();
        // console.log(bList);
        this.bookList = JSON.parse(bList as string);
        // console.log(this.bookList);
        this.DefaultImage();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sanitizeHtml(html:string){
    return this.senitizer.bypassSecurityTrustHtml(html);
  }
  removeTags(str:string){
    return this.senitizer.sanitize(
      SecurityContext.HTML,
      str.replace(/<[^>]*>/g, '')
    )
  }

  private DefaultImage(): void {
    if (this.BookDetail.image) {
      this.imgPath = this.BookDetail.image;
      this.ProfileDb = this.LocalhostPath(this.BookDetail.image);
      // this.studentData.profileImage=this.studentData.profileImage
    } else {
      this.ProfileDb = '/assets/UserDefaultImage.jpg';
    }
  }
  LocalhostPath(localHostImagePath: string) {
    return `${this.baseUrl}/${localHostImagePath}`;
  }

  DeleteClick(bookId: number) {
    // alert('Sure!!!')
    // debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Data will be removed permanently !!!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',
    }).then((result: { value: any; dismiss: any }) => {
      if (result.value) {
        this.modelService.deleteBook(bookId).subscribe(
          (response) => {
            this.getAll();
          },
          (error) => {
            console.log(error);
          }
        );
        Swal.fire('Removed!', 'Record removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Record still in our database.)', 'error');
      }
    });
  }

  readClick(){
    this.router.navigate(['books/readbook']);
  }
}
