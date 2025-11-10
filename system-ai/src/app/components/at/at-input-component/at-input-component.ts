import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FieldConfig } from '../../../core/model/field-config.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-at-input-component',
  imports: [InputTextModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './at-input-component.html',
  styleUrl: './at-input-component.css',
})
export class AtInputComponent {
  // Nhận cấu hình (config) cho field từ component cha truyền xuống
  // Kiểu dữ liệu là FieldConfig (interface định nghĩa cấu hình field: label, type, placeholder, v.v.)
  // Dấu ! (non-null assertion) cho biết chắc chắn sẽ có giá trị khi component được sử dụng
  // Ví dụ: <app-input [config]="configInputName"></app-input>
  @Input() config!: FieldConfig;
}
