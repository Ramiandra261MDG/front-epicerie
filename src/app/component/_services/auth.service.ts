import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { IAuthToken } from "../_models/auth_token";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}
  Base_URL = "http://127.0.0.1:8000/api/";
  private currentUserSource = new BehaviorSubject<IAuthToken | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  // Register
  register(user: any): Observable<object> {
    const requestBody = {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    };

    return this.http.post(this.Base_URL + "register", requestBody).pipe(
      tap(response => {
        return response;
      })
    );
  }

  // Login
  login(user: any): Observable<any> {
    const requestBody = {
      email: user.email,
      password: user.password
    };

    return this.http
      .post<IAuthToken>(this.Base_URL + "login", requestBody)
      .pipe(
        map((response: IAuthToken) => {
          const userLogged = response;
          if (userLogged.status) {
            localStorage.setItem("IAuthToken", JSON.stringify(userLogged));
            this.currentUserSource.next(userLogged);
          } else {
            this.logout();
          }
          return userLogged;
        })
      );
  }

  setCurrentUser(user: IAuthToken) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem("IAuthToken");
    this.currentUserSource.next(null);
  }
}
