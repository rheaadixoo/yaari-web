import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageLoaderService } from './layout/page-loader/page-loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Yaari-Frontend';
  constructor(
    public pageLoaderService: PageLoaderService,
    private router : Router , private route : ActivatedRoute){}

  get isNotCheckoutRoute(){
    if(this.route.snapshot.queryParams.txnToken){
        return true;
    }else {
       return false;
    }
  }
}
