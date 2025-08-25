import { Injectable } from '@angular/core';
import {ProductType} from "../../types/product-type.type";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {OrderType} from "../../types/order-type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea');
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea?id=${id}`);
  }

  placeOrder(data: OrderType) {
    return this.http.post<{success: boolean}>(`https://testologia.ru/order-tea`, data);
  }
}
