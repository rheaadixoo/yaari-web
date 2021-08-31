import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { CookieService } from 'ngx-cookie-service';
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
  constructor(private cartService: CartService, private route: ActivatedRoute, private modalService: NgbModal,
    private formBuilder: FormBuilder, private localStorageService: LocalStorageService,
    private addressService: AddressService, private orderService: OrderService,
    private cookie: CookieService, private router: Router) {
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
    this.modalRef = this.modalService.open(this.addAddress, { backdrop: 'static', keyboard: false, centered: true })
  }

  closeModal(){
    this.modalRef.close()
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

    this.addressService.createNewAddress(payload).subscribe(res => {
      try {
        this.userAddress = res;
        this.closeModal();
      } catch (error) {

      }
    })
  }

  getUserAddress() {
    this.addressService.getAddressByUserId(this.userDetails.id).subscribe(res => {
      try {
        this.userAddress = res;
      } catch (error) {
      }
    })
  }

  editAddress() {
    this.modalService.open(this.addAddress, { backdrop: 'static', keyboard: false });
    // this.addFrm.name.patchValue(this.addAddress)    
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
        try {
          this.router.navigate(['/app/orders/checkout'], { queryParams: { txnToken: res['txnToken'], orderNumber: res['order']['orderNumber'] } })
        } catch (error) {
          console.error("Error--------", error);
        }
      })
    }
  }
}
