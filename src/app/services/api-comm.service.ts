import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiCommService {

  constructor(private http: HttpClient) {
  }

  api_root = "http://127.0.0.1:8000/base-api/"

  file_root = "http://127.0.0.1:8000"

  httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
    )
  };

  postData(data, url): Observable<any> {
    return this.http.post(this.api_root + url, data, this.httpOptions);
  }

  public upload_image(formData) {
  // public upload_image(formData, url) {
  //   return this.http.post<any>(`${this.api_root}upload_images/`, formData);
    return this.http.post<any>(`${this.api_root}save_clothings/`, formData);
    // return this.http.post<any>(this.api_root+url, formData);
  }

  public clothing_saved(formData) {
  // public upload_image(formData, url) {
  //   return this.http.post<any>(`${this.api_root}upload_images/`, formData);
    return this.http.post<any>(`${this.api_root}save_predictions/`, formData);
    // return this.http.post<any>(this.api_root+url, formData);
  }

  getFile_url(){
    return this.file_root
  }

}

