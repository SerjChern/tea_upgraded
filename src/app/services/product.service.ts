import { Injectable } from '@angular/core';
import {ProductType} from "../../types/product-type.type";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {OrderType} from "../../types/order-type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }

  public getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea');
  }

  public getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }

  public placeOrder(data: OrderType) {
    return this.http.post<{success: boolean}>(`https://testologia.ru/order-tea`, data);
  }
}
