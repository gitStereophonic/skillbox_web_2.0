import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: any[];
  checkoutForm: any;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.items = this.cartService.getItems();

    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  onSubmit(myVeryFirstCustomer: any) {
    // Process checkout
    console.warn('Your order has been submitted', myVeryFirstCustomer);

    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }

}
