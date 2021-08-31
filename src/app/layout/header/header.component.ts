import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import "../../../assets/js/popper.min.js";
@Component({
  selector: 'yaari-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isBtnClicked: boolean = false;
  public userOptions: boolean = false;

  constructor( private changeDetectorRef : ChangeDetectorRef) { }

  ngOnInit(): void {}

  get isUserLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout(){
    localStorage.clear()
    this.userOptions = false;
    this.changeDetectorRef.detectChanges()
  }
  get getUserName() {
    if (localStorage.getItem('user-detail')) {
      let userObj = JSON.parse(localStorage.getItem('user-detail'));
      return userObj.name;
    }
  }
}
