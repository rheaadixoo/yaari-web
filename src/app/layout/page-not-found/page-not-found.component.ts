import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'yaari-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  timeLeft: number = 6;
  interval: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.router.navigateByUrl('/');
        window.open('/', '_self');
      }
    }, 1000);
  }

  onHomeClick() {
    this.router.navigateByUrl('/');
    window.open('/', '_self');
     
  }

}
