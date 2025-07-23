import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';

import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';

import { ProductviewcardComponent } from '../../shared/productviewcard/productviewcard.component';
import { ProductResponse } from '../../Types/Response';
import { DataService } from '../../Service/data.service';
import { ProductService } from '../../Service/Product/product.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    FileUploadModule,
    ProductviewcardComponent,
    TextareaModule,
  ],
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
  selectedFile = null as File | null;
  isAddModalOpen = false;
  isAddModalLoading = false;
  isEditModalOpen = false;
  isEditModalLoading = false;
  errorMessage = '';
  isValid = true;

  subscriptions: Subscription[] = [];
  constructor(
    private dataService: DataService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    const sub = this.productService.getProductOfUser().subscribe((res) => {
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
    return new ProductResponse();
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

  onFileSelect(event: FileSelectEvent) {
    const file = event.files[0];
    if (!file) return;
    console.log('Selected file:', file);
    this.selectedFile = file;
  }

  addProduct(): void {
    if (!this.validateProduct(this.newProduct)) return;
    this.isAddModalLoading = true;
    this.productService
      .addProduct(this.newProduct, this.selectedFile ? [this.selectedFile] : [])
      .subscribe((res) => {
        this.products.push(res.data);
        this.isAddModalLoading = false;
        this.filterProducts();
        this.closeModal();
        this.selectedFile = null;
      });
  }

  saveProduct(): void {
    if (!this.validateProduct(this.selectedProduct)) return;

    const index = this.products.findIndex(
      (p) => p.id === this.selectedProduct.id,
    );
    if (index !== -1) {
      this.isEditModalLoading = true;
      this.productService
        .updateProduct(this.selectedProduct)
        .subscribe((res) => {
          this.products[index] = res.data;
          this.filterProducts();
          this.isEditModalLoading = false;
          this.closeModal();
        });
    }
  }

  validateInput(newOrEdit: 'new' | 'edit' = 'new') {
    this.isValid = true;
    this.errorMessage = '';
    if (
      (newOrEdit === 'new' && !this.newProduct.name) ||
      this.newProduct.quantity <= 0 ||
      this.newProduct.threshold <= 0 ||
      this.newProduct.price <= 0
    ) {
      this.isValid = false;
      this.errorMessage =
        'Please enter valid values (name required, quantity/threshold/Price >= 0).';
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
      this.productService.deleteProduct(product.id).subscribe((_res) => {
        this.products.splice(index, 1);
        this.filterProducts();
      });
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
