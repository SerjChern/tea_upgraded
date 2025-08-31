import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {ProductType} from "../../../../types/product-type.type";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  protected products: ProductType[] = [];
  protected loading: boolean = false;

  private subscription: Subscription | null = null;

  constructor(private readonly ProductService: ProductService,
              private readonly router: Router) { }


  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.ProductService.getProducts()
      .pipe(
        tap(() => {this.loading = false}),
      )
      .subscribe({
      next: data => {
        this.products = data;
      },
      error: err => {
        console.log(err);
        this.router.navigate(['/']);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
