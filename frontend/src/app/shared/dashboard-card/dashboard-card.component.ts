import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dashboard-card',
  imports: [CommonModule],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.css',
})
export class DashboardCardComponent {
  @Input() icon: string = '📦';
  @Input() label: string = '';
  @Input() count: number = 0;
  @Input() colorClass: string = 'bg-white';
}
