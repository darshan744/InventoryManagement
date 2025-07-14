import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../Service/data.service';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  products: any;
  filteredProducts: any;
  searchTerm: string = '';
  newProduct = { name: '', quantity: 0, threshold: 0 };
  selectedProduct = { name: '', quantity: 0, threshold: 0 };
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  errorMessage: string = '';
  isValid: boolean = true;

  constructor(private dataService: DataService) {
    this.products = this.dataService.getProducts();
    this.filteredProducts = [...this.products];
  }

  filterProducts() {
    this.filteredProducts = this.dataService
      .getProducts()
      .filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
  }

  openAddModal() {
    this.newProduct = { name: '', quantity: 0, threshold: 0 };
    this.errorMessage = '';
    this.isAddModalOpen = true;
  }

  closeModal() {
    this.isAddModalOpen = false;
    this.isEditModalOpen = false;
    this.errorMessage = '';
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
        this.selectedProduct.quantity < 0 ||
        this.selectedProduct.threshold < 0)
    ) {
      this.isValid = false;
      this.errorMessage =
        'Please enter valid values (name required, quantity/threshold >= 0).';
    }
  }

  addProduct() {
    if (this.isValid) {
      this.dataService.updateProduct({ ...this.newProduct });
      this.dataService.getProducts().push({ ...this.newProduct });
      this.filterProducts();
      this.closeModal();
    }
  }

  openEditModal(product: any) {
    this.selectedProduct = { ...product };
    this.errorMessage = '';
    this.isEditModalOpen = true;
  }

  saveProduct() {
    if (this.isValid) {
      const index = this.dataService
        .getProducts()
        .findIndex((p) => p.name === this.selectedProduct.name);
      if (index !== -1) {
        this.dataService.getProducts()[index] = { ...this.selectedProduct };
        this.dataService.updateProduct({ ...this.selectedProduct });
        this.filterProducts();
      }
      this.closeModal();
    }
  }

  deleteProduct(product: any) {
    this.dataService.getProducts().splice(
      this.dataService.getProducts().findIndex((p) => p.name === product.name),
      1,
    );
    this.filterProducts();
  }

  reorderProduct(product: any) {
    const order = {
      productName: product.name,
      quantity: product.threshold - product.quantity,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    this.dataService.addOrder(order);
    console.log(`Reordered ${product.name}, check Orders page!`);
    // Update product quantity (mock for now)
    product.quantity += order.quantity;
    this.dataService.updateProduct(product);
    this.filterProducts();
  }
}
