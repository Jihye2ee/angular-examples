export class StudyRow {
    seq: number;
    study_instance_uid: string;
    study_date: string;
    referring_physician_name: string;
    study_time: string;
    study_description: string;
    patient_uuid: string;
    analysis_request_timestamp: number;
    analysis_complete_timestamp: number;
    creation_time: number;
    last_update_time: number;
    // internal_pacs_instance_id: string;
    // study_uuid_defined_in_internal_pacs: string;
    tags: string;

    patient_id: string;
    patient_name: string;
    patient_sex: string;
    patient_age: string;

    host: string;
    port: number;

    series_count: number;
    nodule_count: number;
    update_timestamp_sum: number;

    general_user_confirmed: number;
    general_user_id: string;
    general_user_confirmed_timestamp: number;

    professor_confirmed: number;
    professor_id: string;
    professor_confirmed_timestamp: number;

    study_report: string;
    before_confirm_study_report: string;
    baseline: number;
    lung_rads_report_result: any;
    final_rads_score: string;   // lung_rads_report
    study_lung_rads: string; // study

    delete_confirmed_timestamp: number;

    institution: string;
}
