import { Injectable } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) { }
  private life: number = 3000;
  private showToast(options: ToastMessageOptions) {
    this.messageService.add(options);
  }

  success(message: string, head: string) {
    this.showToast({
      severity: 'success',
      summary: head,
      detail: message,
      life: this.life,
    });
  }

  info(message: string, head: string) {
    this.showToast({
      severity: 'info',
      summary: head,
      detail: message,
      life: this.life,
    });
  }

  error(message: string, head: string) {
    this.showToast({
      severity: 'error',
      summary: head,
      detail: message,
      life: this.life,
    });
  }
}

/**
 *
  *text?: any;
    severity?: string;
    summary?: string;
    detail?: string;
    id?: any;
    key?: string;
    life?: number;
    sticky?: boolean;
    closable?: boolean;
    data?: any;
    icon?: string;
    contentStyleClass?: string;
    styleClass?: string;
    closeIcon?: string;*/
