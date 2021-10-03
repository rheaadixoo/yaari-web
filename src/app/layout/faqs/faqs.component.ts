import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yaari-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {
  public faqs: object = [{}];

  constructor() { }

  
  ngOnInit(): void {
    this.buildFaqsJson();
  }

  buildFaqsJson() {
    this.faqs = [
      {
        'id': 'heading',
        'faqs_name': 'Do I have to necessarily register to shop on HalfPriceBazar?',
        'faqs': 'You can surf and add products to the cart without registration but only registered shoppers will be able to checkout and place orders. Registered members have to be logged in at the time of checking out the cart, they will be prompted to do so if they are not logged in.'
      },
      {
        'id': 'heading',
        'faqs_name': 'How do I reset my password?',
        'faqs': 'You need to enter your email address on the Login page and click on forgot password. An email with a reset password will be sent to your email address. With this, you can change your password. In case of any further issues please contact our customer support team.'
      },
      {
        'id': 'heading',
        'faqs_name': 'Is it safe to use my credit/ debit card on HalfPriceBazar?',
        'faqs': 'Yes it is absolutely safe to use your card on halfpricebazar.com. A recent directive from RBI makes it mandatory to have an additional authentication pass code verified by VISA (VBV) or MSC (Master Secure Code) which has to be entered by online shoppers while paying online using visa or master credit card. It means extra security for customers, thus making online shopping safer'
      },
     
    ]
  }
}
