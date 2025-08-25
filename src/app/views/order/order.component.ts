import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {inputValidator} from "../../shared/directives/input-validator.directive";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  public formValues = {
    name: '',
    last_name: '',
    phone: '',
    country: '',
    zip: '',
    product: '',
    address: '',
    comment: ''
  }

  public success: boolean = false;
  public error: boolean = false;

  private subscription: Subscription | null = null;
  private subscriptionOrder: Subscription | null = null;

  orderForm = new FormGroup({
    name: new FormControl('', [Validators.required, inputValidator('^[A-Za-zА-Яа-яЁё]+$')]),
    lastName: new FormControl('', [Validators.required, inputValidator('^[A-Za-zА-Яа-яЁё]+$')]),
    phone: new FormControl('', [Validators.required, inputValidator('^\\+?\\d{11}$')]),
    country: new FormControl('', [Validators.required, inputValidator('^[A-Za-zА-Яа-яЁё\\s]+$')]),
    zip: new FormControl('', [Validators.required, inputValidator('^\\d+$')]),
    address: new FormControl('', [Validators.required, inputValidator('^[A-Za-zА-Яа-яЁё0-9\\s\\-\\/]+$')]),
    comment: new FormControl(''),
  })

  get name() { return this.orderForm.get('name') }
  get lastName() { return this.orderForm.get('lastName') }
  get phone() { return this.orderForm.get('phone') }
  get country() { return this.orderForm.get('country') }
  get zip() { return this.orderForm.get('zip') }
  get address() { return this.orderForm.get('address') }
  get comment() { return this.orderForm.get('comment') }

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      if (params['product']) {
        this.formValues.product = params['product'];
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionOrder?.unsubscribe();
  }

  public createOrder(): void {
    this.subscriptionOrder = this.productService.placeOrder({
      name: this.orderForm.value.name!,
      last_name: this.orderForm.value.lastName!,
      phone: this.orderForm.value.phone!,
      country: this.orderForm.value.country!,
      zip: this.orderForm.value.zip!,
      product: this.formValues.product,
      address: this.orderForm.value.address!,
      comment: this.orderForm.value.comment!
    }).subscribe(response => {
      if (response.success) {
        this.success = true;
      } else {
        this.error = true;
      }
    })
  }
}
