import { BookVM, Genre } from 'projects/book-mfe/src/model';
import { Component } from '@angular/core';
import { BookModule } from '../../book.module';
import { GenreClient, BookClient } from './../../../../model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.scss'],
})
export class NewbookComponent {
  Id: string | null | undefined;
  private baseUrl!: 'https://localhost:7225';
  bookListItem: BookVM[] = [];
  newBook: BookVM = new BookVM();
  editBook: BookVM = new BookVM();
  // genreList: any = [];
  public genreList: Genre[] = [];
  saveBook: BookVM = new BookVM();
  imgPath!: string;
  ProfileDb = '';
  public Editor = ClassicEditor;

  display = false;
  onPress() {
    this.router.navigate(['books/list']);
  }

  constructor(
    private bookService: BookClient,
    private router: Router,
    private genService: GenreClient,
    private httpClient: HttpClient
  ) {
    // this.router.getCurrentNavigation()?.extras;
    // this.newBook = this.router.getCurrentNavigation()?.extras as BookVM;
  }

  ngOnInit() {
    this.getAllGenre();
    this.newBook.title = '';
    this.newBook.description = '';
    this.newBook.author = '';
    this.newBook.genre.genreId = 0;
    this.newBook.image = '';
  }

  getAllGenre() {
    this.genService.getAllGenre().subscribe(
      async (res) => {
        const allGenre = await res?.data.text();
        this.genreList = JSON.parse(allGenre as string);
        // console.log(this.genreList);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  SaveClick() {
    Swal.fire({
      title: 'Caution',
      text: 'Please fill the mendetory Fields !!!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Ok.',
      cancelButtonText: 'Close',
    }).then((result: any) => {
      if (result.value) {
        this.bookService.addBook(this.newBook).subscribe(
          (res) => {
            // alert('Data has been saved !!!');
            this.newBook.title = '';
            this.newBook.description = '';
            this.newBook.author = '';
            this.newBook.genre.genreId = 0;
            this.newBook.image = '';
            // this.display = false;
            // this.router.navigate(['books/list']);
          },
          (err) => {
            console.log(err);
          }
        );
        Swal.fire('Saved!', 'Record saved successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Record not saved.)', 'error');
      }
    });
  }
  // ImageUpload(event: any): void {
  //   if (this.Id) {
  //     const file: File = event.target.files[0];
  //     this.bookService.uploadImage(this.newBook.bookId, file).subscribe(
  //       (response) => {
  //         this.studentData.profileImage = response;
  //         console.log(this.studentData.profileImage);
  //         this.DefaultImage();
  //         this.snackBar.open('Image Uploaded Successfully', undefined, {
  //           duration: 3000,
  //         });
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }
  // }

  // private DefaultImage(): void {
  //   if (this.newBook.image) {
  //     this.imgPath = this.newBook.image;
  //     this.ProfileDb = this.LocalhostPath(this.newBook.image);
  //     // this.studentData.profileImage=this.studentData.profileImage
  //   } else {
  //     this.ProfileDb = '/assets/UserDefaultImage.jpg';
  //   }
  // }

  LocalhostPath(localHostImagePath: string) {
    return `${this.baseUrl}/${localHostImagePath}`;
  }
  onSubmit(form: any) {
    // console.log(form.value);
    // this.SaveClick();
  }
}
