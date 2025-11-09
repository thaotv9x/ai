export interface Column {
    field: string;
    header: string;
    width?: string;
    formatType?: 'currency' | 'status' | 'process' | 'default';
}