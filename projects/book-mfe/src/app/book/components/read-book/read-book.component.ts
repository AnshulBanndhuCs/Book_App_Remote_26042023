import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.scss']
})
export class ReadBookComponent {

  display = false;
  onPress() {
    this.router.navigate(['books/list']);
  }

  constructor(private router: Router){}
}
