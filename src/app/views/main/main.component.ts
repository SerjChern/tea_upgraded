import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import 'jquery';
import 'jquery-ui/ui/widgets/accordion';
declare const $: any;
import WOW from 'wowjs';
import {observable, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  private observable : Observable<number>;
  private subscription: Subscription | null = null;
  public popup: boolean = false;

  constructor() {
    this.observable = new Observable(observer => {
      setTimeout(() => {
        observer.next()
      }, 10000)
    })
  }

  ngOnInit(): void {
    this.subscription = this.observable.subscribe({
      next:() =>  this.popup = true
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
      $('.single-item').slick({
        arrows: true,
        slidesToShow: 1
      });

      $('#accordion').accordion({
        collapsible: true,
        heightStyle: 'content'
      });
  }

}
