import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-examples';
  constructor(
      private http: HttpClient
  ) {
    // http request
    // const url = 'http://localhost:8081/';
    const url = 'http://210.114.91.205:3333/user?action=getlist&session_uuid=d14890d0-53b2-11eb-94cb-850b49877db7';
    const response = this.http.get(url).subscribe(res => console.log(res));
    console.log('[response]', response);

    /* const url2 = 'http://localhost:8081/api?';
    const response2 = this.http.get(url2).subscribe(res => console.log(res));
    console.log('[response2]', response2); */
  }
}
