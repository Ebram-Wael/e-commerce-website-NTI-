import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProducts } from '../../models/iproduct';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  products: IProducts[] = [];
  loading = false;
  error: string | null = null;
  fevProducts: IProducts[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedFavs = localStorage.getItem('fevProducts');
    if (storedFavs) this.fevProducts = JSON.parse(storedFavs);
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openDetails(productId?: string) {
    if (!productId) return;
    this.router.navigate(['/products', productId]);
  }

  toggleFavorite(product: IProducts) {
    const index = this.fevProducts.findIndex(p => p._id === product._id);
    if (index >= 0) {
      this.fevProducts.splice(index, 1);
    } else {
      this.fevProducts.push(product);
    }
    localStorage.setItem('fevProducts', JSON.stringify(this.fevProducts));
    this.cdr.detectChanges();
  }

  isFavorite(product: IProducts): boolean {
    return this.fevProducts.some(p => p._id === product._id);
  }
}
