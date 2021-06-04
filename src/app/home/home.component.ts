import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserTableComponent } from '../user-table/user-table.component';
import {filter, takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NewUserComponent } from '../user-table/add-user/new-user.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    unsubscribe$ = new Subject();
    constructor(
        private dialog: MatDialog,
        private router: Router,
        private authService: AuthService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {

        // if ('serviceWorker' in navigator) {
        //     navigator.serviceWorker.addEventListener('message', function(event) {
        //         console.log('event: ', event);
        //     });

        //     navigator.serviceWorker.register('assets/scripts/service-worker.js').then((e) => {
        //         console.log('service worker register', e);

        //         //this.sendMessage({id:'message'}).then();
        //         navigator.serviceWorker.controller.postMessage({id:'message'});
        //         // return navigator.serviceWorker.ready;
        //     });
        // }
        // http request
        // send http request to nest application
        // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
        // console.log('[headers]', headers);
        // const url = 'http://localhost:3000/user';
        // this.http.get(url, { headers }).subscribe(res => {
        //     console.log('[profile] success', res);
        // }, error => {
        //     console.log('[profile error]', error);
        // });
        // console.log('[response]', response);
        // throw new Error('Method not implemented.');

       
    }

    sendMessage(message) {
        console.log('[sendMessage]', message);
        navigator.serviceWorker.ready.then(function(registration) {
            console.log('Checked for update', registration);
            registration.update().then(function() {
                console.log('Checked for update');
            }).catch(function(error) {
                console.error('Update failed', error);
            });
        });
        // This wraps the message posting/response in a promise, which will resolve if the response doesn't
        // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
        // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
        // a convenient wrapper.
        // return new Promise(function(resolve, reject) {
        //     var messageChannel = new MessageChannel();
        //     messageChannel.port1.onmessage = function(event) {
        //         if (event.data.error) {
        //             reject(event.data.error);
        //         } else {
        //             resolve(event.data);
        //         }
        // };
      
        //     // This sends the message data as well as transferring messageChannel.port2 to the service worker.
        //     // The service worker can then use the transferred port to reply via postMessage(), which
        //     // will in turn trigger the onmessage handler on messageChannel.port1.
        //     // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
        //     navigator.serviceWorker.controller.postMessage(message);
        // });
      }

    openUserTable() {
        console.log('[openUserTable]');
        const dialogConfig = new MatDialogConfig();
        dialogConfig.panelClass = 'user-info-dialog';
        dialogConfig.data = {};
        const dialogRef = this.dialog.open(UserTableComponent, dialogConfig);
        dialogRef.afterClosed().pipe(
            filter(data => !!data),
            takeUntil(this.unsubscribe$)
        ).subscribe(data => {
            console.log('[user-info-dialog] closedafter', data);
            if (data.name === 'open-add-user') {
                this.openNewUserDialog();
            }
        });
    }

    openNewUserDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.panelClass = 'user-info-dialog';
        dialogConfig.data = {};
        const dialogRef = this.dialog.open(NewUserComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(data => {
            this.openUserTable();
        });
    }

    moveToSharedWorkers() {
        this.router.navigate(['workers']);
    }
}
