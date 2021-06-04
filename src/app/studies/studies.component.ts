import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudiesService } from '../common/services/studies.service';
import { Study } from '../model/study/study.component';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.css'],

})
export class StudiesComponent implements OnInit {
    displayedColumns = [ 'status', 'patient_id', 'patient_name', 'patient_sex', 'patient_age', 'nodule_count', 'study_lung_rads', 'final_rads_score', 'study_date', 'study_description', 'tags', 'professor_id'];
    displayedColumns2 = [ 'select', 'status', 'patient_id', 'patient_name', 'patient_sex', 'patient_age', 'nodule_count', 'study_lung_rads', 'final_rads_score', 'study_date', 'study_description', 'tags', 'professor_id'];
    displayedTitle = [ 'Status', 'ID', 'Name', 'Sex', 'Age', 'Nodules', 'Category', 'Category2', 'Study Date', 'Description', 'Tags', 'Confirmed by'];

    isLoadingResults = false;

    skip_nest = 1;
    take = 10;
    sortActive = 'id';
    queryData: any;
    sortMethod = {key: 'study_date', value: 'desc'};
    studyFilteredColumn = [];

    dataSource = new MatTableDataSource<Study>();
    handledStudies = [];



    constructor (
        private studyService: StudiesService
    ) {}

    ngOnInit(): void {
        this.getStudiesData();
    }

    async getStudiesData() {
        console.log('[getStudiesData_nest]', this.skip_nest, this.take, this.sortMethod, this.queryData);
        return new Promise<void>(async resolve => {
            this.isLoadingResults = true;
            this.studyService.findManyStudies(this.skip_nest, this.take, this.sortMethod, this.queryData).subscribe(async (result: Study[]) => {
                console.log('[this.studyService.findManyStudies]', result);
                const tList = result;
                this.isLoadingResults = false;
                if (tList && tList.length === 0) {
                    // this._snackBar.open('There is no study data', '', {duration: 3000, verticalPosition: 'top'});
                    return;
                }
                this.handledStudies = tList  //[];
                // await this.handleStudiesRow(tList); 

                const data: Study[] = this.handledStudies;
                this.dataSource.data = data;
                /** Save at store */
                // this.studyFilteredColumn.length > 0 ? this.store.dispatch(new SaveFilteredStudies(data)) :
                
            });

            resolve();
        });
    }

    masterToggle() {

    }

    onSortRequest(event) {

    }

    /** For marking the latest selected study in the worklist*/
    trackByFn(index, study: Study) {
        return study.patient_id;
    }

}
