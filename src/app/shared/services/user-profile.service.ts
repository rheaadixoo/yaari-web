import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  get userData() {
    return JSON.parse(this.localStorageService.get('user-detail'));
  }

  getUserDetails() {
    return this.http.get(this.apiUrl + 'users/' + this.userData.id).pipe(map(response => {
      return response;
    }))
  }

  updateUserRecord(payload, id) {
    return this.http.patch(this.apiUrl + "users/" + id, payload).pipe(map(response => {
      return response;
    }))
  }

  uploadProfilePhoto(formData) {
    return this.http.post(this.apiUrl + 'files/upload', formData).pipe(map(response => {
      return response;
    }))
  }
}
