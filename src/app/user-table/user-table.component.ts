import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User, USER_DATA } from './user-data';

@Component({
    selector: 'user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class UserTableComponent implements AfterViewInit {
    constructor(public dialogRef: MatDialogRef<UserTableComponent>,
                @Inject(MAT_DIALOG_DATA) public modalData: any) {}
    displayedColumns: string[] = ['select', 'id', 'name', 'permission', 'institution'];
    dataSource = new MatTableDataSource<User>(USER_DATA);
    selection = new SelectionModel<User>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    openAddUser() {
        // console.log('[modalData]', this.modalData);
        this.modalData.name = 'open-add-user';
        this.dialogRef.close(this.modalData);
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: User): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }

        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
