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
      this.web.next(result.matches);
    });
  }

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

  getImageUrl(imagename: string | null): string {
    if (!imagename) {
      return 'assets/images/no-image.png';
    }
    return `${environment.apiUrl}/${imagename}`;
  }
}
