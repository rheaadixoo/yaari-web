import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});
  constructor(private builder: FormBuilder, private loginService: LoginService,
    private router: Router,private localStorageService : LocalStorageService) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.builder.group({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  checkUser() {
    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.loginService.loginUser(payload).subscribe(res => {
      if (res['token']) {
        let token = res['type'] + ' ' + res['token'];
        this.localStorageService.set('token', token);
        this.localStorageService.set('user-detail',atob(res['token'].split('.')[1]));
        this.router.navigate(['/home']);
      }
    })
  }
}
