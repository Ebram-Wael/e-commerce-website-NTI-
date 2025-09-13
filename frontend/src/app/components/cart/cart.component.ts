import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { IProducts } from '../../models/iproduct';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  cartProducts :any = [];
  loading = false;
  error: string | null = null;

  constructor(
    private productService: ProductsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.error = null;

    this.productService.getCart().subscribe({
      next: (data) => {
        this.cartItems = data?.data?.products || [];
        this.cartProducts = this.cartItems.map((item: any) => item.productId); 
        this.loading = false;
        this.cdr.detectChanges(); // ✅ update UI manually
      },
      error: () => {
        this.error = 'Failed to load cart';
        this.loading = false;
        this.cdr.detectChanges(); // ✅ ensure error shown
      }
    });
  }

  removeProductFromCart(productId: string): void {
    this.productService.removeProductFromCart(productId).subscribe({
      next: () => { 
        this.reloadCart() 
        console.log(this.cartItems)

      },
      error: () => alert('Error removing product from cart')

    });
  }

  private reloadCart(): void {
    this.loadCart();
    this.cdr.detectChanges(); // ✅ force re-render after reload
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );
  }

  checkout(): void {
    alert('Checkout process started!');
    // TODO: integrate backend checkout API
  }
  getQty(productId: string): number {
    const item = this.cartItems.find((i: any) => i.productId._id === productId);
    return item ? item.quantity : 0;
  }
}
