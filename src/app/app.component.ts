import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'angular-examples';
    constructor(
        private http: HttpClient,
        private apollo: Apollo,
        private authService: AuthService
    ) {
        

        // const url = 'http://localhost:8081/';
        // const url = 'http://210.114.91.205:3333/user?action=getlist&session_uuid=d14890d0-53b2-11eb-94cb-850b49877db7';
        // const response = this.http.get(url).subscribe(res => console.log(res));
        // console.log('[response]', response);

        /* const url2 = 'http://localhost:8081/api?';
        const response2 = this.http.get(url2).subscribe(res => console.log(res));
        console.log('[response2]', response2); */
    }

    ngOnInit(): void {
        // if ('serviceWorker' in navigator) {
        //     navigator.serviceWorker.addEventListener('message', function(event) {
        //         console.log('event: ', event);
        //     });

        //     navigator.serviceWorker.register('assets/scripts/service-worker.js').then((e) => {
        //         console.log('service worker register', e);

        //         //this.sendMessage({id:'message'}).then();
        //         // 
        //         // return navigator.serviceWorker.ready;
        //     });
        // }

        if (!navigator.serviceWorker || !navigator.serviceWorker.register) {
            console.log("This browser doesn't support service workers");
            return;
        }
    
        // Listen to messages from service workers.
        navigator.serviceWorker.addEventListener('message', function(event) {
            console.log("Got reply from service worker: " + event.data);
        });
    
        // Are we being controlled?
        if (navigator.serviceWorker.controller) {
            // Yes, send our controller a message.
            console.log("Sending 'hi' to controller");
            navigator.serviceWorker.controller.postMessage("hi");
        } else {
            // No, register a service worker to control pages like us.
            // Note that it won't control this instance of this page, it only takes effect
            // for pages in its scope loaded *after* it's installed.
            navigator.serviceWorker.register("assets/scripts/service-worker.js")
                .then(function(registration) {
                    console.log("Service worker registered, scope: " + registration.scope);
                    console.log("Refresh the page to talk to it.");
                    // If we want to, we might do `location.reload();` so that we'd be controlled by it
                })
                .catch(function(error) {
                    console.log("Service worker registration failed: " + error.message);
                });
        }

        this.apollo.watchQuery({
            query: gql`
                {
                    users {
                        id
                        email
                        name
                    }
                }
            `,
            fetchPolicy: 'network-only'
        }).valueChanges.subscribe(res => {
            console.log('[grapqhl results] : ', res?.data);
        });
    }

}
