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

  constructor(
    private productService: ProductsService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data.data;  
        console.log('Loaded products:', this.products);
        this.loading = false;
        this.cdr.detectChanges();   
      },
      error: (err) => {
        console.error('Error fetching products:', err);
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
}
