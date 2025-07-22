import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  web = new BehaviorSubject<boolean>(false);
  web$ = this.web.asObservable();
  constructor(private observer: BreakpointObserver) {
    this.observer.observe([Breakpoints.Handset]).subscribe((result) => {
      console.log('BreakpointObserver result:', result);
      this.web.next(result.matches);
    });
  }

  // isWeb() {
  //   return this.web;
  //   // return Capacitor.getPlatform() === 'web';
  // }
}
