import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserTableComponent } from '../user-table/user-table.component';
import {filter, takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NewUserComponent } from '../user-table/add-user/new-user.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent {
    unsubscribe$ = new Subject();
    constructor(
        private dialog: MatDialog,
        private router: Router
    ) {

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
