import { ResponseModel } from '../models/responseModel';
import { Category } from '../models/category';
import { ListResponseModel } from '../models/listResponseModel';
import { apiUrl } from './serviceConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private serviceUrl = apiUrl + "categories/"

  constructor(private httpClient :HttpClient) { }

  getCategories(): Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.serviceUrl + "getall");
  }

  addCategory(category: Category): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "add", category);
  }

  updateCategory(category: Category): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "update", category);
  }

  deleteCategory(category:Category) : Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.serviceUrl + "delete", category);
  }

}
