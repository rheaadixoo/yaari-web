import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import "../../../assets/js/popper.min.js";
@Component({
  selector: 'yaari-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isBtnClicked: boolean = false;
  public userOptions: boolean = false;

  constructor( private changeDetectorRef : ChangeDetectorRef,private router : Router) { }

  ngOnInit(): void {}

  get isUserLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout(){
    let _that = this;
    localStorage.clear()
    this.userOptions = false;
    _that.router.navigate(['/home']);
    this.changeDetectorRef.detectChanges()
  }

  get getUserName() {
    if (localStorage.getItem('user-detail')) {
      let userObj = JSON.parse(localStorage.getItem('user-detail'));
      return userObj.name;
    }
  }
}
