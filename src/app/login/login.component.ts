import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { PreviousRouteService } from '../shared/services/previous-route.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});
  public previousUrl: any = '';
  constructor(private builder: FormBuilder, private loginService: LoginService,
    private router: Router, private localStorageService: LocalStorageService,
    private toastr: ToastrService, private cartService: CartService,
    private cookie: CookieService, private previousRouteService: PreviousRouteService) { }

  ngOnInit(): void {
    this.previousUrl = this.previousRouteService.getPreviousUrl();
    console.log('this.previousUrl: ', this.previousUrl);
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
          this.cartService.getCartWithUserId(user.id).subscribe((res: any[]) => {
            if (res.length > 0) {
              if (this.cookie.get('cart')) {
                let cartObj = JSON.parse(this.cookie.get('cart'));
                if (cartObj.id == res['id']) {
                  return;
                } else {
                  this.cookie.deleteAll();
                  this.cookie.set('cart', JSON.stringify({ id: res[0]['id'] }), { expires: 365, path: '/' });
                }
              }else{
                 console.log("rs",res[0]);
                 this.cookie.set('cart', JSON.stringify({ id: res[0]['id'] }), { expires: 365, path: '/' });  
              }
            } else if (!res.length) {
              if (this.cookie.get('cart')) {
                let cartObj = JSON.parse(this.cookie.get('cart'));
                this.cartService.updateCart(cartObj['id'], { userId: user.id }).subscribe(res => {
                  console.log("cart updated");
                })
              } else {
                this.cartService.createCartWithUserId(user.id).subscribe(response => {
                  console.log("cart created with user id");
                  this.cookie.set('cart', JSON.stringify({ id: response['id'] }), { expires: 365, path: '/' });
                })
              }
            }
          })
          // if (this.cookie.get('cart')) {
          //   let cartObj = JSON.parse(this.cookie.get('cart'));
          //   this.cartService.updateCart(cartObj['id'], { userId: user.id }).subscribe(res => {
          //     console.log("cart updated");
          //   })
          // }
          console.log("this.previousUrl >>>>>>>>>>",this.previousUrl);
          
          if (this.previousUrl.includes('/login')) {
            this.router.navigate(['/home']);

          } else {
            if(!this.previousUrl.includes('register')){
              this.router.navigate([this.previousUrl]);
            }else{
              this.router.navigate(['/home']);
            }
          }
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
      // if (this.loginForm.value.email.replace(/\s/g, "") === '') {
      //   this.loginForm.controls.email.patchValue(null);
      // }

      if(this.loginForm.value.email === '' )
      {
        this.toastr.error("Email field is required")

      }
      else  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.loginForm.value.email)))
      {
        this.toastr.error("You have entered an invalid email address!");
        // return (true)
      }
    
    } else if (type == 'password') {
      // if (this.loginForm.value.password.replace(/\s/g, "") === '') {
      //   this.loginForm.controls.password.patchValue(null);
      // }
      if(this.loginForm.value.password === '' )
      {
        this.toastr.error("password field is required")

      }
    }
  }
}
