import { Component, OnInit } from '@angular/core';
import {ContactUsService} from 'src/app/shared/services/contact-us.service';
import {Router} from '@angular/router';
import { FormControl ,Validators} from '@angular/forms';
import { FormGroup } from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

// else if(!(this.registerForm.value.first_name.match("^[a-zA-Z\\s]*$")))
//       {
//        this.toastr.error("Invalid First Name")   //fullname validation
//       }

// else if(!(this.registerForm.value.first_name.match("^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$")))
// {
//  this.toastr.error("Invalid First Name")
// }

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  postContactForm=false;
  
  public ContactForm: FormGroup=new FormGroup({});
  public isVisible: boolean = true;
  public pass_type: string = 'password';
  public pass_field: string = 'password';
  public showPassword: boolean = true;

  constructor(private register: ContactUsService,private toastr :ToastrService,private router: Router,private builder: FormBuilder) { }

  
  
  // ContactForm=new FormGroup({
  //   fullName:new FormControl(),
  //   email:new FormControl(),
  //   subject:new FormControl(),
  //   message:new FormControl()
  // })

  ngOnInit(): void {
    this.buildContactForm();
  }
 
  buildContactForm(){
    this.ContactForm = this.builder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', [Validators.required, Validators.required]],
      message: ['', [Validators.required, Validators.required]],
      
    })
  }

  postFormData(data:any ){
    console.log(data);
    this.register.postContactForm(data).subscribe((res)=>{
      this.postContactForm=true;
      console.log(res);
      if(this.postContactForm){
      try {
        this.toastr.success('Thank you for contacting us !');
        this.router.navigate(["/home"]);
        
      } catch (error) {
        this.toastr.error('Form not submitted,Try contacting after sometime !');
      }
  }
  else{
    alert('not posted :-(');
  }
    });
  }


validateFormField(type) {
  if (type == 'fullName') {
    // console.log(this.registerForm.value.first_name.length)
    if(this.ContactForm.value.fullName === '' )
    {
      this.toastr.error("Name field is required")

    }
    else if(!(this.ContactForm.value.fullName.match("^[a-zA-Z\\s]*$")))
    {
     this.toastr.error("Invalid Full Name")
    }
  }
    
  else if (type == 'email') {
   
    if(this.ContactForm.value.email === '' )
    {
      this.toastr.error("Email field is required")

    }
    else  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.ContactForm.value.email)))
    {
      this.toastr.error("You have entered an invalid email address!");
    }
  }

   else if (type == 'subject') {

    if(this.ContactForm.value.subject==='' )
    {
      this.toastr.error("subject field is required")

    }
   else if(this.ContactForm.value.subject.length >= 200)
    {
      this.toastr.error('Maximum limit 200 characters exceeded');
      
     }
  }
  else if (type == 'message') {

    if(this.ContactForm.value.message==='' )
    {
      this.toastr.error("message field is required")

    }
   else if(this.ContactForm.value.message.length >= 200)
    {
      this.toastr.error('Maximum limit 200 characters exceeded');
      
     }
    
  } 
}
}
