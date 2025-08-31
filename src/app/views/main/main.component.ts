import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subscription} from "rxjs";
import 'jquery';
import 'jquery-ui/ui/widgets/accordion';

declare const $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private observable : Observable<number>;
  private subscription: Subscription | null = null;
  protected popup: boolean = false;

  constructor() {
    this.observable = new Observable(observer => {
      setTimeout(() => {
        observer.next()
      }, 10000)
    })
  }

  protected closeTab(): void {
    this.popup = false;
  }


  ngOnInit(): void {
    this.subscription = this.observable.subscribe({
      next:() =>  this.popup = true
    })

    $('#accordion').accordion({
      collapsible: true,
      heightStyle: 'content'
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
