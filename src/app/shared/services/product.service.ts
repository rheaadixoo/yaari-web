import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = environment.apiUrl
  constructor(private http: HttpClient) { }
  public stage: BehaviorSubject<any> = new BehaviorSubject([]);
  currentProductStage = this.stage.asObservable();

  getProductsList(subCatId) {
    const query = {
      where: {
        and: [{ subCategoryId: subCatId, productStatus: 'approved', status: 'active' }]
      }
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'products', options).pipe(map(response => {
      return response;
    }))
  }

  getProductById(id) {
    return this.http.get(this.apiUrl + 'products/' + id).pipe(map(response => {
      return response;
    }))
  }

  searchProducts(value) {
    const query = {
      where: {
        and: [{ "or": [{ name: { "like": `%${value}%` } }], productStatus: 'approved', status: 'active' },]
      },
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'products', options).pipe(map(response => {
      return response;
    }))
  }

  filterProductsList(payload) {
    let query = {};
    if (payload['isFeatured']) {
      query = {
        where: {
          and: [{ sub_category_id: payload['subCategoryId'], productStatus: 'approved', status: 'active', featured: payload['isFeatured'] }]
        }
      };
    } else if (payload['sort']) {
      query = {
        where: {
          and: [{ sub_category_id: payload['subCategoryId'], productStatus: 'approved', status: 'active' }]
        },
        order: [[payload['sort']['by'], payload['sort']['type']]]
      };
    }
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'products', options).pipe(map(response => {
      return response;
    }))
  }

  getProductListById(id) {
    let query = {
      where: {
        and: [{ subCategoryId: id, productStatus: 'approved', status: 'active' }]
      }
    };
    const filter = JSON.stringify(query);
    const options = {
      params: new HttpParams()
        .append("filter", filter)
    };
    return this.http.get(this.apiUrl + 'products', options).pipe(map(response => {
      return response;
    }))
  }

  getPoductReviewById(productId) {
    const query = {
      where : {
        productId
      }
    }

    const options = {
      params : new HttpParams().append('filter', JSON.stringify(query))
    }
    return this.http.get(this.apiUrl + 'comments', options).pipe(map(response => {
      return response;
    }))
  }

  getUserDetailsById(id){
    return this.http.get(this.apiUrl + 'users/' + id).pipe(map(response => {
      return response;
    }))
  }
}
