import { Column } from "./column-table";

export interface TableConfig {
    data: any[];
    columns: Column[];
    onAction?: (event: any) => void;
    showDelete?: boolean;
    showEdit?: boolean;
}
