import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProductResponse } from '../../Types/Response';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-productviewcard',
  imports: [CardModule, CommonModule],
  templateUrl: './productviewcard.component.html',
  styleUrl: './productviewcard.component.css',
})
export class ProductviewcardComponent {
  product = input.required<ProductResponse | null>();

  get productGet(): ProductResponse | null {
    return this.product() ?? null;
  }
  get productImage() {
    if (this.productGet?.image) {
      return this.productGet.image.startsWith('http')
        ? this.productGet.image
        : `http://localhost:3000/${this.productGet.image}`;
    }
    return null;
  }
}
