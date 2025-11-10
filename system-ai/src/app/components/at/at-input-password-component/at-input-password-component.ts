import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FieldConfig } from '../../../core/model/field-config.model';

@Component({
  selector: 'app-at-input-password-component',
  imports: [PasswordModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './at-input-password-component.html',
  styleUrl: './at-input-password-component.css',
})
export class AtInputPasswordComponent {

  // Nhận cấu hình (config) cho field từ component cha truyền xuống
  // Kiểu dữ liệu là FieldConfig (interface định nghĩa cấu hình field: label, type, placeholder, v.v.)
  // Dấu ! (non-null assertion) cho biết chắc chắn sẽ có giá trị khi component được sử dụng
  // Ví dụ: <app-input [config]="configInputName"></app-input>
  @Input() config!: FieldConfig;
}
