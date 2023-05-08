export interface VacationRequest {
    id: number;
    person: string;
    startDate: string;
    endDate: string;
    type: VacationType;
    created: string,
    status: VacationRequestStatus,
    message: string
}

export enum VacationType {
    VACATION = 'VACATION',
    UNPAID_TIME_OFF = 'UNPAID_TIME_OFF',
    SICKNESS = 'SICKNESS',
    PERSONAL_DAYS = 'PERSONAL_DAYS',
    MATERNITY_PATERNITY = 'MATERNITY/PATERNITY',
    CHILD_SICKNESS = 'CHILD_SICKNESS'
}

export enum VacationRequestStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED'
}

export type NewVacationRequest = Omit<VacationRequest, 'id'>;