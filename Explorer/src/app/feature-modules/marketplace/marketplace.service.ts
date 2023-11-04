import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { ReportedIssue } from './model/reported-issue.model';
import { TourPreference } from './model/preference.model';
import { TourRating } from './model/tour-rating.model';
import { OrderItem } from './model/order-item.model';
import { ShoppingCart } from './model/shopping-cart.model';
import { Tour } from '../tour-authoring/model/tour.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  constructor(private http: HttpClient) { }

  addReportedIssue(reportedIssue: ReportedIssue): Observable<ReportedIssue> {
    return this.http.post<ReportedIssue>(environment.apiHost + 'tourist/reportingIssue', reportedIssue);
  }

  addTourPreference(preference: TourPreference): Observable<TourPreference> {
    return this.http.post<TourPreference>(environment.apiHost + 'tourism/preference', preference);
  }

  updateTourPreference(preference: TourPreference): Observable<TourPreference> {
    return this.http.put<TourPreference>(environment.apiHost + 'tourism/preference/' + preference.id, preference);
  }

  getTourPreference(id: number): Observable<TourPreference> {
    return this.http.get<TourPreference>(environment.apiHost + 'tourism/preference/'+id)
  }

  deleteTourPreference(id: number): Observable<TourPreference> {
    return this.http.delete<TourPreference>(environment.apiHost + 'tourism/preference/' + id);
  }

  getTourRating(userType: string): Observable<PagedResults<TourRating>> {
    let url: string;  // Construct the URL based on the user type
    switch (userType) {
      case 'administrator': 
        url = 'administration/tour-rating'; 
        break;
      case 'author': 
        url = 'author/tour-rating';
        break;
      case 'tourist':
        //TODO tourist -> tourism ???
        url = 'tourist/tour-rating';
        break;
      default:
        throw new Error('Invalid user type');
    }

    return this.http.get<PagedResults<TourRating>>(environment.apiHost + url);
  }

  deleteTourRating(id: number): Observable<TourRating> {    
    return this.http.delete<TourRating>(environment.apiHost + 'administration/tour-rating/' + id);
  }

  addTourRating(rating: TourRating): Observable<TourRating> {
    return this.http.post<TourRating>(environment.apiHost + 'tourist/tour-rating', rating);
  }

  checkShoppingCart(touristId: number): Observable<boolean> {
    return this.http.get<boolean>(environment.apiHost + 'tourist/shopping-cart/checkShoppingCart/' + touristId);
  }

  addOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(environment.apiHost + 'tourist/order-item', orderItem);
  }

  getShoppingCart(touristId: number): Observable<ShoppingCart> {
    return this.http.get<ShoppingCart>(environment.apiHost + 'tourist/shopping-cart/getShoppingCart/' + touristId);
  }

  addShoppingCart(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(environment.apiHost + 'tourist/shopping-cart', shoppingCart);
  }

  updateShoppingCart(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
    return this.http.put<ShoppingCart>(environment.apiHost + 'tourist/shopping-cart/' + shoppingCart.id, shoppingCart);
  }

  getTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(environment.apiHost + 'administration/tour');
  }
}
