import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class StudiesService {

    constructor (
        private http: HttpClient
    ) {

    }

    findManyStudies(query: string) {
        const url = `http://${window.location.hostname}:3000/studies?where=${query}`;
        return this.http.get(url);
    }

    findManyStudies_nest(skip: number, take?: number, orderBy?: any, query?: any) {
        const url = `http://${window.location.hostname}:3000/studies/filter?skip=${skip}&take=${take}${orderBy ? `&orderBy=${JSON.stringify(orderBy)}`:''}${query ? `&where=${JSON.stringify(query)}`:''}`;
        console.log('[findManyStudies_nest]', url);
        return this.http.get(url);
    }
    
    studiesCount_nest(query?: any) {
        // const param = { skip: skip, take: take };
        // let order = JSON.stringify(orderBy);
        const url = `http://${window.location.hostname}:3000/studies/count?${query ? `where=${JSON.stringify(query)}`:''}`;
        return this.http.get(url);
    }
}