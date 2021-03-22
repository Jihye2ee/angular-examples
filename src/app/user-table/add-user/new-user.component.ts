import { Component, Inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'new-user',
    template: `
        <form class="example-form" [formGroup]="formCreateNewUserModal">
            <div class="flex-container">
                <mat-form-field class="example-full-width" color="primary">
                    <mat-label>Email</mat-label>
                    <input matInput type="text" formControlName="userID">
                    <mat-error *ngIf="formCreateNewUserModal.controls['userID'].hasError('required')">
                        ID is <strong>required</strong>
                    </mat-error>
                </mat-form-field>
                <mat-form-field class="example-full-width">
                    <mat-label>Password</mat-label>
                    <input matInput [type]="hide ? 'password' : 'text'" formControlName="userPassword">
                    <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                    <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
                    </button>
                    <mat-error *ngIf="formCreateNewUserModal.controls['userPassword'].hasError('required')">
                        password is <strong>required</strong>
                    </mat-error>
                    <mat-error *ngIf="formCreateNewUserModal.controls['userPassword'].hasError('pattern') && !formCreateNewUserModal.controls['userPassword'].hasError('required')">
                        Password must contain a minimum of 8 characters.<br/>
                        Password must contain at least one lowercase character.<br/>
                        Password must contain at least one uppercase character.<br/>
                        Password must contain at least one numeric character.<br/>
                        Password must contain at least one non-alphanumeric character.<br/>
                    </mat-error>
                </mat-form-field>
            </div>
        </form>
    `,
    styles: [`
        .example-form {
            width: calc(100vw - 800px);
            padding: 20px;
            background-color: #2D2D2D;
        }

        .example-full-width {
            /* width: 100%; */
        }
    `]
})
export class NewUserComponent {
    hide = false;
    formCreateNewUserModal: FormGroup;
    regexPassword = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}';
    // userID = new FormControl('', [
    //     Validators.required
    // ]);
    constructor(@Inject(MAT_DIALOG_DATA) public modalData: any,
                public dialogRef: MatDialogRef<NewUserComponent>,
                private formBuilder: FormBuilder) {

        this.formCreateNewUserModal = this.formBuilder.group({
            userID: new FormControl('', [Validators.required]),
            userPassword: new FormControl('', [Validators.required, Validators.pattern(this.regexPassword)]),
        });
        this.formCreateNewUserModal.controls['userID'].setValue('');
        this.formCreateNewUserModal.valueChanges.subscribe(data => {
            // this.dummyUser.id = data.userID;
            // this.dummyUser.name = data.userName;
            // this.dummyUser.password = data.userPassword;
        });
    }
}

