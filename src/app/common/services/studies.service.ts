import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class StudiesService {

    constructor (
        private http: HttpClient
    ) {

    }

    findManyStudies(skip: number, take?: number, orderBy?: any, query?: any) {
        // const param = { skip: skip, take: take };
        const url = `http://${window.location.hostname}:3000/studies?skip=${skip}&take=${take}`;
        return this.http.get(url);
    }
}