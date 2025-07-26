import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { OrderStatus } from '../../Types/Response';
import { ButtonSeverity } from 'primeng/button';
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
  //
  constructImage(image: string): string {
    return `${environment.apiUrl}/${image}`;
  }

  severityTypeForOrders(orderStatus: OrderStatus) {
    switch (orderStatus) {
      case 'PENDING': {
        return 'info';
      }
      case 'COMPLETED': {
        return 'success';
      }
      case 'CANCELLED': {
        return 'danger';
      }
      default: {
        return 'secondary';
      }
    }
  }
}
