import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createWishList(payload) {
    return this.http.post(this.apiUrl + 'wishlists', payload).pipe(map(response => {
      return response;
    }))
  }

  createWishListDetail(payload) {
    return this.http.post(this.apiUrl + 'wishlist-details', payload).pipe(map(response => {
      return response;
    }))
  }

  isProductExistInWishlist(id,product_id) {
    const query = {
      where: { wishlistId : id, productId : product_id }
    }
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + "wishlist-details", options).pipe(map(response => {
      return response;
    }))
  }

  fetchWishListDetails(wishlist_id) {
    const query = {
      where: {
        and: [{ wishlistId: wishlist_id },]
      },
      include: [{ "all": true }]
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + "wishlist-details", options).pipe(map(response => {
      return response;
    }))
  }

  deleteWishlistDetail(id){
    return this.http.delete(this.apiUrl + "wishlist-details/"+id).pipe(map(response => {
      return response;
    }))
  }
}
