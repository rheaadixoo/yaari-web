import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../shared/services/register.service';
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

  constructor(private builder: FormBuilder,private registerService : RegisterService) { }

  ngOnInit(): void {
    this.buildRegistrationForm();
  }

  buildRegistrationForm() {
    this.registerForm = this.builder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]]
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
      if (this.registerForm.value.first_name.replace(/\s/g, "") === '') {
        this.registerForm.controls.first_name.patchValue(null);
      }
    } else if (type == 'last_name') {
      if (this.registerForm.value.last_name.replace(/\s/g, "") === '') {
        this.registerForm.controls.last_name.patchValue(null);
      }
    } else if (type == 'email') {
      if (this.registerForm.value.email.replace(/\s/g, "") === '') {
        this.registerForm.controls.email.patchValue(null);
      }
    } else if (type == 'password') {
      if (this.registerForm.value.password.replace(/\s/g, "") === '') {
        this.registerForm.controls.password.patchValue(null);
      }
    } else if (type == 'confirm') {
      if (this.registerForm.value.confirm_password.replace(/\s/g, "") === '') {
        this.registerForm.controls.confirm_password.patchValue(null);
      }
    }
  }
  
  createUser(){
      const payload = {
          firstName : this.registerForm.value.first_name,
          lastName : this.registerForm.value.last_name,
          email : this.registerForm.value.email,
          password : this.registerForm.value.password,
          mobile : "1234567890"
      }
      this.registerService.createUser(payload).subscribe(response =>{
            console.log("-----response-------",response);
      })
  }
}
