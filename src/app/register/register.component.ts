import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../shared/services/register.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});
  public isVisible: boolean = true;
  public pass_type: string = 'password';
  public pass_field: string = 'password';
  public showPassword: boolean = true;

  constructor(
    private builder: FormBuilder,
    private registerService: RegisterService,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.buildRegistrationForm();
  }

  buildRegistrationForm() {
    this.registerForm = this.builder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10),Validators.pattern("^[0-9]*$")]]
    })
  }

  showPass(type) {
    if (type == 'show') {
      this.showPassword = !this.showPassword;
      this.pass_field = 'text';
    } else if (type == 'hide') {
      this.showPassword = !this.showPassword;
      this.pass_field = 'password';
    }
  }

  showConfirmPass(type) {
    if (type == 'show') {
      this.isVisible = !this.isVisible;
      this.pass_type = 'text';
    } else if (type == "hide") {
      this.isVisible = !this.isVisible;
      this.pass_type = 'password';
    }
  }

  validateFormField(type) {
   
    if (type == 'name') {
      // if (this.registerForm.value.first_name.replace(/\s/g, "") === '') {
      //   this.registerForm.controls.first_name.patchValue(null);
      // }
      if((this.registerForm.value.first_name === '')){
        this.toastr.error('First Name field cannot be empty');
      }
    } else if (type == 'last_name') {
      if (this.registerForm.value.last_name.replace(/\s/g, "") === '') {
        this.registerForm.controls.last_name.patchValue(null);
      }
      if((this.registerForm.value.address === '')){
        this.toastr.error('Last Name field cannot be empty');
      }
    } else if (type == 'email') {
      if (this.registerForm.value.email.replace(/\s/g, "") === '') {
        this.registerForm.controls.email.patchValue(null);
      }
    } else if (type == 'password') {
      if (this.registerForm.value.password.replace(/\s/g, "") === '') {
        this.registerForm.controls.password.patchValue(null);
      }
      if (this.registerForm.value.password.length < 8) {
        this.toastr.error('Password must be of atleast 8 character');
    } 
    } else if (type == 'confirm') {
      if (this.registerForm.value.confirm_password.replace(/\s/g, "") === '') {
        this.registerForm.controls.confirm_password.patchValue(null);
      }
    } else if (type == 'mobile') {
      if(!(this.registerForm.value.mobile.match("^([7-9]{1})([0-9]{9})$"))){
        this.toastr.error('Invalid mobile number');
    }
  }
  }

  createUser() {
    const payload = {
      firstName: this.registerForm.value.first_name,
      lastName: this.registerForm.value.last_name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      mobile: this.registerForm.value.mobile
    }
    if (this.registerForm.value.password != this.registerForm.value.confirm_password) {
      this.toastr.error('Confirm password is incorrect');
    } else {
      this.registerService.createUser(payload).subscribe(response => {
        this.toastr.success('User Registered Successfully');
        this.registerForm.reset();
        this.router.navigateByUrl("/login");
      }, error => {
        if(error['error'].statusCode == 422){
          this.toastr.error('User already exist with this number');
        }else{
          this.toastr.error(error.error.message);
        }
      })
    }
  }
}
