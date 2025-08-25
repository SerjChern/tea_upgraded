import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {CustomTextPipe} from "./pipes/custom-text.pipe";
import {RouterModule} from "@angular/router";
import {InputValidatorDirective} from "./directives/input-validator.directive";



@NgModule({
  declarations: [
    HeaderComponent,
    ProductCardComponent,
    CustomTextPipe,
    InputValidatorDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ProductCardComponent,
    CustomTextPipe,
    InputValidatorDirective
  ]
})
export class SharedModule { }
