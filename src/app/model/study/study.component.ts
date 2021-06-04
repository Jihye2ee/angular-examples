import { StudyRow } from "../study-row.component";

export class Study extends StudyRow {
    // seriesList: Series[];
    onAnalysing = false;
    status = '';
    isLastSelected: boolean;
    creation_time_string: string;
    creation_time_yyyymmdd_string: string;
    creation_detail_time_string: string;
    study_date_disp_string: string;
    study_time_disp_string: string;
    study_detail_time_string: string;
    study_analysis_date_string: string;
    host: string;
    port: number;
    annotationConfirmedStatus = 'Empty';
    delete_confirmed_timestamp: number;
    isEstimated: boolean;

    constructor() {
        super();
        // this.seriesList = [];
    }
    setStatusExamined(): void {
        this.status = 'Examined';
    }
    setStatusAnalysing(): void {
        this.status = 'Analysing';
    }
    setStatusAnalysed(): void {
        this.status = 'Analysed';
    }
    setStatusDeleting(): void {
        this.status = 'Deleting';
    }
    setStatusTranscribing(): void {
        this.status = 'Transcribing';
    }
    setStatusReviewed(): void {
        this.status = 'Reviewed';
    }
    setStatusTranscribed(): void {
        this.status = 'Transcribed';
    }
    setStatusApproved(): void {
        this.status = 'Approved';
    }
    isExamined(): boolean {
        if (this.status === 'Examined') {
            return true;
        } else {
            return false;
        }
    }
    isAnalysing(): boolean {
        if (this.status === 'Analysing') {
            return true;
        } else {
            return false;
        }
    }
    isDeleting(): boolean {
        if (this.status === 'Deleting') {
            return true;
        } else {
            return false;
        }
    }
    isAnalysed(): boolean {
        if (this.status === 'Analysed') {
            return true;
        } else {
            return false;
        }
    }
    isTranscribing(): boolean {
        if (this.status === 'Transcribing') {
            return true;
        } else {
            return false;
        }
    }
    isReviewed(): boolean {
        if (this.status === 'Reviewed') {
            return true;
        } else {
            return false;
        }
    }
    isTranscribed(): boolean {
        if (this.status === 'Transcribed') {
            return true;
        } else {
            return false;
        }
    }
    isApproved(): boolean {
        if (this.status === 'Approved') {
            return true;
        } else {
            return false;
        }
    }
}
