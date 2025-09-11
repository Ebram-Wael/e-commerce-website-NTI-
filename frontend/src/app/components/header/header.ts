import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ RouterModule ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{
  userLoggedIn: boolean = false;
  cartCount = 0;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    this.userLoggedIn = !!user && !!token;

    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartCount = JSON.parse(cart).length;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('fevProducts');
    this.userLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
