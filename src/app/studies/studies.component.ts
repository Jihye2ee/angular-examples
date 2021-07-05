import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DialogPosition, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelService } from '../common/services/excel.service';
import { StudiesService } from '../common/services/studies.service';
import { Study } from '../model/study/study.component';

export interface PeriodicElement {
    patientName: string;
    patientID: string;
    studyInstanceUID: string;
    creationDate: string;
    creationTime: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {patientName: 'a', patientID: 'Hydrogen', studyInstanceUID: '1.0079', creationDate: 'b', creationTime: 'H'},
    {patientName: 'a', patientID: 'Helium', studyInstanceUID: '4.0026', creationDate: 'b', creationTime: 'He'},
    {patientName: 'a', patientID: 'Lithium', studyInstanceUID: '6.941', creationDate: 'b',creationTime: 'Li'},
    {patientName: 'a', patientID: 'Beryllium', studyInstanceUID: '9.0122', creationDate: 'b',creationTime: 'Be'},
    {patientName: 'a', patientID: 'Boron', studyInstanceUID: '10.811', creationDate: 'b',creationTime: 'B'},
    {patientName: 'a', patientID: 'Carbon', studyInstanceUID: '12.0107', creationDate: 'b',creationTime: 'C'},
    {patientName: 'a', patientID: 'Nitrogen', studyInstanceUID: '14.0067', creationDate: 'b',creationTime: 'N'},
    {patientName: 'a', patientID: 'Oxygen', studyInstanceUID: '15.9994',creationDate: 'b', creationTime: 'O'},
    {patientName: 'a', patientID: 'Fluorine', studyInstanceUID: '18.9984', creationDate: 'b',creationTime: 'F'},
    {patientName: 'a', patientID: 'Neon', studyInstanceUID: '20.1797',creationDate: 'b', creationTime: 'Ne'},
];
@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css'],

})
export class StudiesComponent implements OnInit {
    displayedColumns: string[] = ['select', 'patientID', 'patientName', 'studyInstanceUID', 'creationDate', 'creationTime'];
    // dataSource = new MatTableDataSource<RemoteStudy>();
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);
    filterEntity: PeriodicElement;
    // filterType: MatTableFilter;

    systemBaseEnvironment: any;
    selectedServiceModeOption: string;
    hospitalDicomNodeAE: string;
    hospitalDicomNodeHost: string;
    hospitalDicomNodePort: string;
    localDcmFileRootPath: string;
    diskMinimumFreeSpace: string;

    remoteStudies: Study[] = [];
    oversize: number;
    previousRemoteStudyDcmFileTransmissionStatusTimeoutExist: boolean;

    remoteStudyInstanceUIDsInTrasmissionStandBy: string[] = [];
    remoteStudyInstanceUIDsInTrasmission: string[] = [];
    remoteStudyInstanceUIDsInTrasmissionFailed: string[] = [];

    studyInstanceUIDsInTransmissionStandBy: string[] = [];
    studyInstanceUIDsInTransmission: string[] = [];
    tmpRemoteStudies: Study[] = [];
    selectedRemoteStudies = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private excelService: ExcelService
    ) {}   
    

    ngOnInit() {
        // console.log(this.modalData);
        
        this.dataSource.paginator = this.paginator;
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            this.selectedRemoteStudies = this.selection.selected;
            return;
        }

        this.selection.select(...this.dataSource.data);
        this.selectedRemoteStudies = this.selection.selected;
    }

    toggleValue(row) {
        console.log(this.selection);
        this.selection.toggle(row)
        console.log(this.selection); 
        this.selectedRemoteStudies = this.selection.selected
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
    }

    exportExcelFile() {
        this.excelService.exportAsExcelFile(ELEMENT_DATA, 'filteredStudies');
    }

    // onTextFilter(event, idx: number): void {
    //     const el = this.displayedColumns[idx];
    //     console.log(el);
    //     event.stopPropagation();
    //     const y = window.scrollY + document.querySelector(`#${el}`).getBoundingClientRect().top; // Y
    //     const x = window.scrollX + document.querySelector(`#${el}`).getBoundingClientRect().left; // X
    //     const dialogPosition: DialogPosition = {
    //         left: Math.round(x - 50) + 'px',
    //         top: Math.round(y + 30) + 'px'
    //     };

    //     this.dialog.open(FilterTextDialogComponent, {
    //         panelClass: 'filter-text-dialog',
    //         position: dialogPosition,
    //         height: '85px',
    //         autoFocus: false,
    //     }).afterClosed().subscribe(result => {
    //         console.log('the dialog was closed', result);
    //     });
    // }
    // private coloringFilterSymbol(name: string) {
    //     // return Object.keys(this.filterObj).includes(name);
    //     return false;
    // }
}
