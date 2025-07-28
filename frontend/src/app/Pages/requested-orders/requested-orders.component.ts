import { Component, input, signal } from '@angular/core';
import { OrderService } from '../../Service/Order/order.service';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../Service/Utils/utils.service';
import { ButtonModule } from 'primeng/button';
import {
  RequestOrderResponse,
  RequestOrderStatusChange,
} from '../../Types/Response';

@Component({
  selector: 'app-requested-orders',
  imports: [CommonModule, ButtonModule],
  templateUrl: './requested-orders.component.html',
  styleUrl: './requested-orders.component.css',
})
export class RequestedOrdersComponent {
  acceptButtonLoading = signal(false);
  declineButtonLoading = signal(false);
  requestOrder = input<RequestOrderResponse>({} as RequestOrderResponse);
  get request() {
    return this.requestOrder();
  }
  handleDecline(id: string) {
    this.declineButtonLoading.set(true);
    this.orderService.updateStatus(id, 'CANCELLED').subscribe((res) => {
      this.updateStatus(res.data);
      this.declineButtonLoading.set(false);
    });
  }
  updateStatus({ id, status }: RequestOrderStatusChange) {
    this.request.status = status;
  }
  handleAccept(id: string) {
    this.acceptButtonLoading.set(true);
    this.orderService.updateStatus(id, 'COMPLETED').subscribe((res) => {
      this.updateStatus(res.data);
      this.acceptButtonLoading.set(false);
    });
  }
  constructor(
    private orderService: OrderService,
    public util: UtilsService,
  ) { }
}
