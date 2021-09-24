import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  @ViewChild('addAddress') addAddress;
  public cartId: any = 0;
  public cartDetails: any = [];
  public totalPrice: any = 0;
  public totalDiscount: any = 0;
  public totalAmount: any = 0;
  public totalQuantity: any = 0;
  public addressForm: FormGroup = new FormGroup({});
  public userAddress: any = [];
  public formType: string = "Add Address"
  public modalRef : NgbModalRef;
  public editModeAddressId : any = 0;
  constructor(private cartService: CartService, private route: ActivatedRoute, private modalService: NgbModal,
    private formBuilder: FormBuilder, private localStorageService: LocalStorageService,
    private addressService: AddressService, private orderService: OrderService,
    private cookie: CookieService, private router: Router,
    private toastr : ToastrService) {
    if (this.route.snapshot.queryParams.id) {
      this.cartId = this.route.snapshot.queryParams.id;
    }
  }

  ngOnInit(): void {
    this.getCartDetail();
    this.getUserAddress();
    this.buildAddAddressForm();
  }

  getCartDetail() {
    this.cartService.getCart(this.cartId).subscribe(res => {
      try {
        this.cartDetails = res;
        this.setTotalAmount();
      } catch (error) {
        console.log("=---err---", error);
      }
    })
  }

  setTotalAmount() {
    for (let ele of this.cartDetails) {
      this.totalQuantity += ele.quantity;
      this.totalPrice += Math.round(ele.product.price * ele.quantity);
      this.totalDiscount += Math.round((ele.product.price * ele.quantity) - (ele.product.sellingPrice * ele.quantity));
    }
    this.totalAmount = Math.round(this.totalPrice - this.totalDiscount);
    console.log("quantity after", this.totalAmount);
  }

  addAddressModal() {
    this.buildAddAddressForm()
    this.modalRef = this.modalService.open(this.addAddress, { backdrop: 'static', keyboard: false, centered: true })
  }

  closeModal(){
    this.editModeAddressId = 0;
    this.addressForm.reset();
    this.modalRef.close();
  }
  buildAddAddressForm() {
    this.addressForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('India', [Validators.required]),
    })
  }

  addUserAddress() {
    const payload = {
      name: this.addressForm.value.name,
      address: this.addressForm.value.address,
      city: this.addressForm.value.city,
      state: this.addressForm.value.state,
      pinCode: this.addressForm.value.pincode,
      country: this.addressForm.value.country,
      userId: this.userDetails.id
    }

    if(this.formType == 'Add Address'){
      this.addressService.createNewAddress(payload).subscribe(res => {
        try {
          this.userAddress = res;
          this.getUserAddress();
          this.closeModal();
        } catch (error) {
        }
      })  
    }else{
      this.addressService.updateUserAddress(payload,this.editModeAddressId).subscribe(res => {
        try {
          this.userAddress = res;
          this.getUserAddress();
          this.closeModal();
        } catch (error) {
        }
      })
    }
    
  }

  getUserAddress() {
    this.addressService.getAddressByUserId(this.userDetails.id).subscribe(res => {
      try {
        this.userAddress = res;
      } catch (error) {
      }
    })
  }

  editAddress(item) {
    this.formType = "Edit Address";
    this.editModeAddressId = item.id;
    this.modalRef = this.modalService.open(this.addAddress, { backdrop: 'static', keyboard: false });
    this.addFrm.name.patchValue(item.name);
    this.addFrm.address.patchValue(item.address);
    this.addFrm.city.patchValue(item.city);
    this.addFrm.state.patchValue(item.state);
    this.addFrm.pincode.patchValue(item.pinCode);
    this.addFrm.country.patchValue(item.country);    
  }

  get addFrm() {
    return this.addressForm.controls;
  }

  get userDetails() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  createOrder() {
    if (this.cookie.get('cart')) {
      const cartObj = JSON.parse(this.cookie.get('cart'));
      const userObj = JSON.parse(this.localStorageService.get('user-detail'));
      const payload = {
        cartId: cartObj['id'],
        addressId: 5,
        userId: userObj['id']
      }
      this.orderService.createOrder(payload).subscribe(res => {
        this.router.navigate(['/app/orders/checkout'], { queryParams: { txnToken: res['txnToken'], orderNumber: res['order']['orderNumber'] } })
        this.toastr.success('Order created successfully');
          },error =>{
        this.toastr.success(error['error']['message']);
      })
    }
  }

  createPayLaterOrder(){
    if (this.cookie.get('cart')) {
      const cartObj = JSON.parse(this.cookie.get('cart'));
      const userObj = JSON.parse(this.localStorageService.get('user-detail'));
      const payload = {
        cartId: cartObj['id'],
        addressId: 5,
        userId: userObj['id'],
        payLater : true
      }
      this.orderService.createOrder(payload).subscribe(res => {
        this.toastr.success('Order created successfully');
      },error =>{
        this.toastr.success(error['error']['message']);
      })
    }
  }

  validateFormField(type) {
    if (type == 'name') {
      if (this.addressForm.value.name.replace(/\s/g, "") === '') {
        this.addressForm.controls.name.patchValue(null);
      }
    } else if (type == 'address') {
      if (this.addressForm.value.address.replace(/\s/g, "") === '') {
        this.addressForm.controls.address.patchValue(null);
      }
    } else if (type == 'city') {
      if (this.addressForm.value.city.replace(/\s/g, "") === '') {
        this.addressForm.controls.city.patchValue(null);
      }
    } else if (type == 'pincode') {
      if (this.addressForm.value.pincode.replace(/\s/g, "") === '') {
        this.addressForm.controls.pincode.patchValue(null);
      }
    } else if (type == 'state') {
      if (this.addressForm.value.state.replace(/\s/g, "") === '') {
        this.addressForm.controls.state.patchValue(null);
      }
    }
  }
}
