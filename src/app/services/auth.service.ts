import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { shareReplay, tap } from "rxjs/operators";
import { User } from "../user-table/user-data";

@Injectable()
export class AuthService {

    appUrl = 'http://localhost:3000';
    TOKEN_NAME = 'jwt_token';

    constructor(
        private http: HttpClient
    ) { }

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