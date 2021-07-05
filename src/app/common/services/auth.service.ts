import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { User } from "src/app/models/user";

@Injectable()
export class AuthService {

    appUrl = 'http://localhost:3000';
    TOKEN_NAME = 'jwt_token';

    constructor(
        private http: HttpClient
    ) { }

    signup(user: User) {
        console.log('[signup]', user);
        return this.http.post(`${this.appUrl}/auth/login`, user)
        .pipe(
            tap((res) => this.setToken(res['access_token']),
            // shareReplay()
        ));
    }

    signin(user: User) {
        console.log('[signin]', user);
        return this.http.post(`${this.appUrl}/auth/login`, user)
        .pipe(
            tap((res) => this.setToken(res['access_token']),
            // shareReplay()
        ));
    }

    setToken(token: string) {
        localStorage.setItem(this.TOKEN_NAME, token);
    }

    getToken(): string {
        return localStorage.getItem(this.TOKEN_NAME);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_NAME);
    }
}