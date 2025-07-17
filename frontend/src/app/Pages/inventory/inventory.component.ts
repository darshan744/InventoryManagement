import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

import { DataService } from '../../Service/data.service';
import { ProductService } from '../../Service/Product/product.service';
import { ProductResponse } from '../../Types/Response';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit, OnDestroy {
  unitTypes: Array<ProductResponse['unit']> = [
    'PCS',
    'KG',
    'LITERS',
    'BOX',
    'OTHER',
  ];

  products: ProductResponse[] = [];
  filteredProducts: ProductResponse[] = [];
  searchTerm = '';

  newProduct: ProductResponse = this.getEmptyProduct();
  selectedProduct: ProductResponse = this.getEmptyProduct();

  isAddModalOpen = false;
  isAddModalLoading = false;
  isEditModalOpen = false;
  errorMessage = '';
  isValid = true;

  subscriptions: Subscription[] = [];
  constructor(
    private dataService: DataService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    const sub = this.productService.getProducts().subscribe((res) => {
      if (!res?.data) {
        console.error('Failed to fetch products:', res);
        return;
      }
      this.products = res.data;
      this.filteredProducts = [...this.products];
    });
    this.subscriptions.push(sub);
  }

  getEmptyProduct(): ProductResponse {
    return new ProductResponse('', '', 0, 0, 'PCS', '', new Date(), '');
  }

  filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((p) =>
      p.name?.toLowerCase().includes(term),
    );
  }

  openAddModal(): void {
    this.newProduct = this.getEmptyProduct();
    this.isAddModalOpen = true;
    this.errorMessage = '';
    this.isValid = true;
  }

  openEditModal(product: ProductResponse): void {
    this.selectedProduct = { ...product };
    this.isEditModalOpen = true;
    this.errorMessage = '';
    this.isValid = true;
  }

  closeModal(): void {
    this.isAddModalOpen = false;
    this.isEditModalOpen = false;
    this.errorMessage = '';
  }

  validateProduct(product: ProductResponse): boolean {
    const isValid =
      !!product.name && product.quantity >= 0 && product.threshold >= 0;
    this.errorMessage = isValid
      ? ''
      : 'Please enter valid values (name required, quantity/threshold >= 0).';
    return isValid;
  }

  addProduct(): void {
    if (!this.validateProduct(this.newProduct)) return;
    this.isAddModalLoading = true;
    this.productService.addProduct(this.newProduct).subscribe((res) => {
      this.products.push(res.data);
      this.isAddModalLoading = false;
      this.filterProducts();
      this.closeModal();
    });
  }

  saveProduct(): void {
    if (!this.validateProduct(this.selectedProduct)) return;

    const index = this.products.findIndex(
      (p) => p.id === this.selectedProduct.id,
    );
    if (index !== -1) {
      this.products[index] = { ...this.selectedProduct };
      this.dataService.updateProduct(this.selectedProduct);
      this.filterProducts();
    }
    this.closeModal();
  }

  validateInput() {
    this.isValid = true;
    this.errorMessage = '';
    if (
      !this.newProduct.name ||
      this.newProduct.quantity < 0 ||
      this.newProduct.threshold < 0
    ) {
      this.isValid = false;
      this.errorMessage =
        'Please enter valid values (name required, quantity/threshold >= 0).';
    }
    if (
      this.isEditModalOpen &&
      (!this.selectedProduct.name ||
        (this.selectedProduct.quantity && this.selectedProduct.quantity < 0) ||
        (this.selectedProduct.threshold && this.selectedProduct.threshold < 0))
    ) {
      this.isValid = false;
      this.errorMessage =
        'Please enter valid values (name required, quantity/threshold >= 0).';
    }
  }
  deleteProduct(product: ProductResponse): void {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.dataService.getProducts().splice(index, 1); // Assumes dataService holds local copy
      this.filterProducts();
    }
  }

  reorderProduct(product: ProductResponse): void {
    const reorderQty = product.threshold - product.quantity;
    if (reorderQty <= 0) return;

    const order = {
      productName: product.name,
      quantity: reorderQty,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };

    this.dataService.addOrder(order);
    product.quantity += reorderQty;
    this.dataService.updateProduct(product);
    this.filterProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
