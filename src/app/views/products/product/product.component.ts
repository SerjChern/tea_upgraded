import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../../../types/product-type.type";
import {ProductService} from "../../../services/product.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: ProductType;
  private subscription: Subscription | null = null;
  constructor(private http: HttpClient,
              private productService: ProductService,
              private ActivatedRoute: ActivatedRoute,
              private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
  }

  public loading: boolean = false;
  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.ActivatedRoute.params
      .pipe(
        tap(() => {this.loading = false}),
      )
      .subscribe(params => {
      if (params['id']) {
        this.productService.getProduct(+params['id'])
          .subscribe({
            next: data => {
              this.product = data;
            },
            error: err => {
              console.error(err);
              //this.router.navigate(['/']);
            }
          });
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
