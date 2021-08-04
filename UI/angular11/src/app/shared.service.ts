import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly apiUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + '/Categories');
  }

  addCategory(val: any) {
    return this.http.post(this.apiUrl + '/Categories', val);
  }

  updateCategory(id: string, val: any) {
    return this.http.put(this.apiUrl + '/Categories/' + id, val);
  }

  deleteCategory(val: any) {
    return this.http.delete(this.apiUrl + '/Categories/' + val);
  }

  getCategories(val: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/Categories/Results', val);
  }

  currentCategoryNumber(val: any) {
    return this.http.post(this.apiUrl + '/Categories/CurrentNumber', val)
  }

  addArticle(val: any) {
    return this.http.post(this.apiUrl + '/Articles', val);
  }

  updateArticle(id: string, val: any) {
    return this.http.put(this.apiUrl + '/Articles/' + id, val);
  }

  deleteArticle(val: any) {
    return this.http.delete(this.apiUrl + '/Articles/' + val);
  }

  getArticles(val: any): Observable<any[]> {
    return this.http.post<any>(this.apiUrl + '/Articles/Results', val);
  }

  currentArticleNumber(val: any) {
    return this.http.post(this.apiUrl + '/Articles/CurrentNumber', val)
  }
}
