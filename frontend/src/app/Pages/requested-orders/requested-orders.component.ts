import { Component } from '@angular/core';
import { OrderService } from '../../Service/Order/order.service';
import { CommonModule } from '@angular/common';
import { RequestOrders } from '../../../../../BackendType';
import { UtilsService } from '../../Service/Utils/utils.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-requested-orders',
  imports: [CommonModule ,ButtonModule],
  templateUrl: './requested-orders.component.html',
  styleUrl: './requested-orders.component.css',
})
export class RequestedOrdersComponent {
  handleDecline(arg0: string) {
    throw new Error('Method not implemented.');
  }
  handleAccept(arg0: string) {
    throw new Error('Method not implemented.');
  }
  requestOrders: RequestOrders[] = [];
  constructor(private orderService: OrderService , public util : UtilsService) { }

  ngOnInit() {
    this.orderService.getRequestOrders().subscribe((res) => {
      this.requestOrders = res.data;
    });
  }

}
