import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'yaari-redirect-to',
  templateUrl: './redirect-to.component.html',
  styleUrls: ['./redirect-to.component.scss']
})
export class RedirectToComponent implements OnInit {
  public isPaymentSuccessfull : boolean = false;
  public isPaymentFailed : boolean = false;
  constructor(private route: ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams) {
      if (this.route.snapshot.queryParams['status'] == 'success') {
        this.isPaymentSuccessfull = true;
        setTimeout(()=>{
          this.router.navigateByUrl('/home');
        },5000)
      } else if (this.route.snapshot.queryParams['status'] =! 'success') {
        this.isPaymentFailed = true;
        this.isPaymentSuccessfull = false;
        setTimeout(()=>{
          this.router.navigateByUrl('/home');
        },5000)
      }
    }
  }
}
