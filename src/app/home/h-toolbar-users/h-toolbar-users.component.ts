import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserInfoService } from 'src/app/common/services/user-info.service';
import { User } from 'src/app/components/user.component';
import { RestAPIService } from 'src/app/common/services/restapi.service';
import { UserRow } from 'src/app/components/userrow.component';
import { CommonService } from 'src/app/common/services/common.services';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserListDialogComponent } from '../../../dialog/user-account-dialog/user-list-dialog.component';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AddUserDialogComponent } from '../../../dialog/user-account-dialog/add-user-dialog.component';

@Component({
    selector: 'h-toolbar-users',
    template:
    `
        <div *ngIf="permission=='ADMINISTRATOR' || permission==''" class="flex-item-row top-menu-tools-container" (click)="openUserListModal()">
            <div title="Users" class="flex-top-menu-tools-icon-item-row-clr">
                <img class="top-menu-tools-icon-button-clr" src="assets/button-icons/toolbar/customer.svg">
            </div>
            <div class="flex-top-menu-tools-icon-item-text">Users</div>
        </div>
    `,
    styles: [`
        .user-list-dialog select.mat-input-element {
            top: 0;
            margin-bottom: 0;
        }
    `]
})
export class HToolbarUsersComponent implements OnChanges {

    @Input() isToolbarReady;

    unsubscribe$ = new Subject();
    users: User[] = [];
    permission: string;

    constructor (
        private userInfoService: UserInfoService,
        private restAPIService: RestAPIService,
        private commonService: CommonService,
        private dialog: MatDialog,
    ) {
        this.permission = this.userInfoService.userPermission;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.isToolbarReady && changes.isToolbarReady.currentValue !== undefined) {
            if (changes.isToolbarReady.currentValue) {
                this.isToolbarReady = changes.isToolbarReady.currentValue;
            }
        }
    }

    openUserListModal(): void {
        this.restAPIService.getUsers().subscribe(async (result: UserRow[]) => {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.panelClass = 'user-list-dialog';
            dialogConfig.data = {
                userList: result
            };
            const dialogRef = this.dialog.open(UserListDialogComponent, dialogConfig);

            ////////////////////////////////////////////////////////////////////////
            dialogRef.afterClosed().pipe(
                filter(data => !!data),
                takeUntil(this.unsubscribe$)
            ).subscribe(data => {
                console.log('[user-info-dialog] closedafter', data);
                if (data.type === 'add' || data.type === 'edit') {
                    this.openNewUserDialog(data);
                }
            });
        });
    }

    openNewUserDialog(data: any = {}) {
        console.log('[openNewUserDialog]', data);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.panelClass = 'user-list-dialog';
        dialogConfig.autoFocus = false;
        dialogConfig.data = {
            type: data.type,
            title: data.title,
            user: data.user
        };
        const dialogRef = this.dialog.open(AddUserDialogComponent, dialogConfig);

        //////////////////////////////////////////////////////////////////////////
        dialogRef.afterClosed().subscribe(data => {
            if (!data.isClose) {
                this.openUserListModal();
            }
        });
    }
}
