import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/shared/services/contact-us.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  postContactForm=false;
  
  constructor(private register: ContactUsService,private toastr :ToastrService,private router: Router) { }
  
  ContactForm=new FormGroup({
    fullName:new FormControl(),
    email:new FormControl(),
    subject:new FormControl(),
    message:new FormControl()
  })

  ngOnInit(): void {
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
}
