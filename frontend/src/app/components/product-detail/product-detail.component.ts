import { CommonModule, Location } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { IProducts } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  productId!: string;
  product: IProducts | null = null;

  constructor(
    public activatedRoute: ActivatedRoute,
    public productService: ProductsService,
    public location: Location,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.productId = id;
        this.productService.getProductById(this.productId)
          .subscribe({
            next: (data: any) => { 
              this.product = data.data;   
              this.cdr.detectChanges(); 
            },
            error: (err) => { 
              console.error('Error fetching product:', err); 
            }
          });
      } else {
        console.error('Product ID not found in route');
      }
    });
  }

  goBack() {
    this.location.back();
  }

  addToCart() {
    if (!this.product) return;

    this.productService.addProductToCart(this.product._id.toString())
      .subscribe({
        next: (res: any) => {
          alert(res.message || 'Product added to cart successfully');
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          alert('Failed to add product to cart');
        }
      });
  }
}
