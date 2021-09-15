import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'yaari-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userForm: FormGroup = new FormGroup({});
  public userObj: any = {};
  public activeTab: string = 'profile';
  public imgUrl: string = '';
  constructor(private toastr: ToastrService, private builder: FormBuilder, private localStorageService: LocalStorageService,
    private userService: UserProfileService, private addressService: AddressService) { }

  ngOnInit(): void {
    this.getUserRecord();
    this.buildUserForm();
  }

  get userData() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  buildUserForm() {
    this.userForm = this.builder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]]
    })
  }

  get UForm() {
    return this.userForm.controls;
  }

  getUserRecord() {
    this.addressService.getAddressByUserId(this.userData.id).subscribe((response: any[]) => {
      if (response.length > 0) {
        this.userObj = response[0];
        this.imgUrl = this.userObj.user['profileImage'];
        this.UForm.first_name.patchValue(this.userObj.user.firstName);
        this.UForm.last_name.patchValue(this.userObj.user.lastName);
        this.UForm.email.patchValue(this.userObj.user.email);
        this.UForm.mobile.patchValue(this.userObj.user.mobile);
        this.UForm.city.patchValue(this.userObj.city);
        this.UForm.state.patchValue(this.userObj.state);
        this.UForm.pincode.patchValue(this.userObj.pinCode);
        this.UForm.address.patchValue(this.userObj.address);
        console.log("0this-", this.UForm);
      } else {
        this.userService.getUserDetails().subscribe((response: any[]) => {
          this.userObj = response;
          this.imgUrl = this.userObj['profileImage'];
          this.UForm.first_name.patchValue(this.userObj.firstName);
          this.UForm.last_name.patchValue(this.userObj.lastName);
          this.UForm.email.patchValue(this.userObj.email);
          this.UForm.mobile.patchValue(this.userObj.mobile);
        }, error => {
          console.log("user details error",error);  
        })
      }

    }, error => {
      console.log("uuuuser========", error);
    })
  }

  updateUser() {
    const payload = {
      firstName: this.userForm.value.first_name,
      lastName: this.userForm.value.last_name,
      email: this.userForm.value.email,
      mobile: this.userForm.value.mobile,
      profileImage: this.imgUrl
    }

    const addressPayload = {
      name: this.userObj.name,
      address: this.userForm.value.address,
      city: this.userForm.value.city,
      state: this.userForm.value.state,
      pinCode: this.userForm.value.pincode,
      userId : this.userObj.id,
      country: "India"
    }

    this.userService.updateUserRecord(payload, this.userData.id).subscribe(response => {
      if(this.userObj.address){
        this.addressService.updateUserAddress(addressPayload, this.userObj.id).subscribe(res => {
          this.toastr.success('Profile Updated Successfully');
        }, err => {
          this.toastr.error(err, "Address");
        })
      }else{
        this.addressService.createNewAddress(addressPayload).subscribe(res => {
          this.toastr.success('Profile Updated Successfully');
        }, err => {
          this.toastr.error(err, "Address");
        })
      }
      
    }, error => {
      this.toastr.error(error);
    })
  }

  validateFormField(type) {
    if (type == 'name') {
      if (this.userForm.value.first_name.replace(/\s/g, "") === '') {
        this.userForm.controls.first_name.patchValue(null);
      }
    } else if (type == 'last_name') {
      if (this.userForm.value.last_name.replace(/\s/g, "") === '') {
        this.userForm.controls.last_name.patchValue(null);
      }
    } else if (type == 'email') {
      if (this.userForm.value.email.replace(/\s/g, "") === '') {
        this.userForm.controls.email.patchValue(null);
      }
    } else if (type == 'mobile') {
      if (this.userForm.value.mobile.replace(/\s/g, "") === '') {
        this.userForm.controls.mobile.patchValue(null);
      }
    } else if (type == 'state') {
      if (this.userForm.value.state.replace(/\s/g, "") === '') {
        this.userForm.controls.state.patchValue(null);
      }
    } else if (type == 'city') {
      if (this.userForm.value.city.replace(/\s/g, "") === '') {
        this.userForm.controls.city.patchValue(null);
      }
    } else if (type == 'pincode') {
      if (this.userForm.value.pincode.replace(/\s/g, "") === '') {
        this.userForm.controls.pincode.patchValue(null);
      }
    } else if (type == 'address') {
      if (this.userForm.value.address.replace(/\s/g, "") === '') {
        this.userForm.controls.address.patchValue(null);
      }
    }
  }

  systemFilesPicked(ev) {
    let file: File = ev[0];
    let formData: FormData = new FormData();
    console.log("file.name", file.name);
    formData.append('files', file, file.name);
    console.log("formData", formData);
    this.userService.uploadProfilePhoto(formData).subscribe(res => {
      if (res['files'][0]['path']) {
        this.imgUrl = res['files'][0]['path'];
      }
    })
  }
}
