import { Component, OnInit } from '@angular/core';
import { Tour } from '../../tour-authoring/model/tour.model';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { Router } from '@angular/router';
import { OrderItem } from '../model/order-item.model';
import { ShoppingCart } from '../model/shopping-cart.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';

@Component({
  selector: 'xp-all-tours',
  templateUrl: './all-tours.component.html',
  styleUrls: ['./all-tours.component.css']
})
export class AllToursComponent implements OnInit{
  tours: Tour[] = [];
  user: User;
  id:number;
  
  constructor(private service: MarketplaceService,private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.service.getTours().subscribe({
      next: (result: PagedResults<Tour>) => {
        this.tours = result.results;
        console.log(this.tours);
    },
    })
  }
  

  addToCart(t: Tour): void{
    const orderItem: OrderItem = {
      tourId: t.id || 0,
      tourName: t.name,
      price: t.price,
    };

    this.service.addOrderItem(orderItem).subscribe({
      next: (result: OrderItem) => {
        this.addItemToCart(orderItem, t);
      },
      error: () => {
      }
    })
  }

  addItemToCart(orderItem: OrderItem, tour: Tour): void{
    this.service.checkShoppingCart(this.user.id).subscribe((cartExists) => {
      if (cartExists) {
        this.service.getShoppingCart(tour.authorId).subscribe((shoppingCart) => {
          shoppingCart.items.push(orderItem);
          this.service.updateShoppingCart(shoppingCart).subscribe(() => {
          });
        });
      } else {
        const newShoppingCart: ShoppingCart = {
          touristId: this.user.id,
          price: orderItem.price,
          items: [orderItem],
        };
        this.service.addShoppingCart(newShoppingCart).subscribe(() => {
        });
      }
    });
  }
}
