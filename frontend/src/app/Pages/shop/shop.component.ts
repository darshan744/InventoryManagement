import { Component, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-shop',
  imports: [SelectModule, InputTextModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  searchBy = signal<"Product"|"Suppliers">("Product")
}
