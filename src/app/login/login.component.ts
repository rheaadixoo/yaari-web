import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});
  constructor(private builder: FormBuilder, private loginService: LoginService,
    private router: Router, private localStorageService: LocalStorageService,
    private toastr: ToastrService,private cartService : CartService,
    private cookie : CookieService) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.builder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  checkUser() {
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    if (this.lForm.valid) {
      this.loginService.loginUser(payload).subscribe(res => {
        if (res['token']) {
          let token = res['type'] + ' ' + res['token'];
          this.localStorageService.set('token', token);
          this.localStorageService.set('user-detail', atob(res['token'].split('.')[1]));
          let user = JSON.parse(this.localStorageService.get('user-detail'));
          let cartObj = JSON.parse(this.cookie.get('cart'));
          this.cartService.updateCart(cartObj['id'],{userId : user.id}).subscribe(res=>{
              console.log("cart updated");
          })
          this.router.navigate(['/home']);
        }
      }, error => {
        this.toastr.error('Invalid', 'User Record');
      })
    }
  }

  get lForm() {
    return this.loginForm;
  }

  validateFormField(type) {
    if (type == 'email') {
      if (this.loginForm.value.email.replace(/\s/g, "") === '') {
        this.loginForm.controls.email.patchValue(null);
      }
    } else if (type == 'password') {
      if (this.loginForm.value.password.replace(/\s/g, "") === '') {
        this.loginForm.controls.password.patchValue(null);
      }
    }
  }
}
