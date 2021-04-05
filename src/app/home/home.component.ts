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
    ) { }
    ngOnInit(): void {
        // http request
        // send http request to nest application
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
        // console.log('[headers]', headers);
        const url = 'http://localhost:3000/user';
        this.http.get(url, { headers }).subscribe(res => {
            console.log('[profile] success', res);
        }, error => {
            console.log('[profile error]', error);
        });
        // console.log('[response]', response);
        // throw new Error('Method not implemented.');
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
