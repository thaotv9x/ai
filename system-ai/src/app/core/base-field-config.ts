import { Directive, Input } from "@angular/core";
import { FieldConfig } from "./model/field-config.model";

@Directive()
export class BaseFieldConfig {
    // Nhận cấu hình (config) cho field từ component cha truyền xuống
    // Kiểu dữ liệu là FieldConfig (interface định nghĩa cấu hình field: label, type, placeholder, v.v.)
    // Dấu ! (non-null assertion) cho biết chắc chắn sẽ có giá trị khi component được sử dụng
    @Input() fieldConfig!: FieldConfig;
}
