import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Iitem } from "../_models/item";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  constructor(private http: HttpClient) {}
  //Base_URL = "http://127.0.0.1:8000/api/";
  Base_URL = "http://epicerie-api.wuaze.com/api/";

  getToken() {
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzAzNzA0NzU4LCJleHAiOjE3MDM3MDgzNTgsIm5iZiI6MTcwMzcwNDc1OCwianRpIjoidFE0MGJsN21vWFZKSzkydCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.UJ6Obwqj_p1hvRXD7jRxatmfrpg5FUqxMjWHyZ8MKKE";

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return headers;
  }

  // Get Item (paginate - 10 items)
  get(page: number): Observable<any> {
    const headers = this.getToken();

    return this.http
      .get(this.Base_URL + "item/all?page=" + page, { headers })
      .pipe(
        tap(response => {
          return response;
        })
      );
  }

  // Search Item
  getItemById(id: number): Observable<any> {
    const headers = this.getToken();

    return this.http.get(this.Base_URL + "item/search/" + id, { headers }).pipe(
      tap(response => {
        return response;
      })
    );
  }

  // Create Item
  storeItem(item: Iitem): Observable<any> {
    const headers = this.getToken();

    const requestBody = {
      name: item.name,
      price: item.price,
      total: item.total
    };

    return this.http
      .post(this.Base_URL + "item/add", requestBody, { headers })
      .pipe(tap(response => console.log(response)));
  }

  // Edit Item
  updateItem(item: Iitem, id: number): Observable<any> {
    const headers = this.getToken();

    const requestBody = {
      name: item.name,
      price: item.price,
      total: item.total
    };

    return this.http
      .put(this.Base_URL + "item/update/" + id, requestBody, {
        headers
      })
      .pipe(
        tap(response => {
          return response;
        })
      );
  }

  // Delete Item
  deleteItem(id: number): Observable<any> {
    const headers = this.getToken();

    return this.http
      .delete(this.Base_URL + "item/delete/" + id, { headers })
      .pipe(tap(response => console.log(response)));
  }
}
