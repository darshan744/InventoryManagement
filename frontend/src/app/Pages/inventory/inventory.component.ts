import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule , FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  products = [
    { name: 'Laptop', quantity: 5, threshold: 10 },
    { name: 'T-Shirt', quantity: 2, threshold: 5 },
    { name: 'Phone', quantity: 8, threshold: 10 },
  ];
  filteredProducts = [...this.products];
  searchTerm: string = '';
  newProduct = { name: '', quantity: 0, threshold: 0 };
  selectedProduct = { name: '', quantity: 0, threshold: 0 };
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;

  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  openAddModal() {
    this.newProduct = { name: '', quantity: 0, threshold: 0 };
    this.isAddModalOpen = true;
  }

  closeModal() {
    this.isAddModalOpen = false;
    this.isEditModalOpen = false;
  }

  addProduct() {
    if (
      this.newProduct.name &&
      this.newProduct.quantity >= 0 &&
      this.newProduct.threshold >= 0
    ) {
      this.products.push({ ...this.newProduct });
      this.filterProducts();
      this.closeModal();
    }
  }

  openEditModal(product: any) {
    this.selectedProduct = { ...product };
    this.isEditModalOpen = true;
  }

  saveProduct() {
    const index = this.products.findIndex(
      (p) => p.name === this.selectedProduct.name,
    );
    if (index !== -1) {
      this.products[index] = { ...this.selectedProduct };
      this.filterProducts();
    }
    this.closeModal();
  }

  deleteProduct(product: any) {
    this.products = this.products.filter((p) => p.name !== product.name);
    this.filterProducts();
  }

  reorderProduct(product: any) {
    console.log(`Reordering ${product.name} (Qty: ${product.quantity})`);
    // Add reorder logic here (e.g., API call)
  }
}
