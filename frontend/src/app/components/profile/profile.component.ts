import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IProducts } from '../../models/iproduct';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  favProducts: IProducts[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.authService.getMe().subscribe({
        next: (res) => {
          this.user = res.data;
          localStorage.setItem('user', JSON.stringify(this.user));
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error fetching user data', err);
        }
      });
    }

    const storedFav = localStorage.getItem('fevProducts');
    if (storedFav) {
      this.favProducts = JSON.parse(storedFav);
    }
  }

  removeFromFav(productId: string) {
    this.favProducts = this.favProducts.filter(p => p._id !== productId);
    localStorage.setItem('fevProducts', JSON.stringify(this.favProducts));
  }
}
