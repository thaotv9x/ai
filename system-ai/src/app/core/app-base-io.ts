import { Input, Output, EventEmitter, Directive } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { ButtonSeverity } from "primeng/button";
import { TableConfig } from "./model/config-table";
import { OptionDropdown } from "./model/option-dropdown";
import { FormSubmitService } from "./services/form-submit.service";

@Directive()
export abstract class BaseTableInOut {
  @Input() label: string = '';
  @Input() severity: ButtonSeverity = 'primary';
  @Input() row: any;
  @Input() icon: string = '';
  @Input() config!: TableConfig;
  @Input() formGroup!: FormGroup;
  @Input() options: OptionDropdown[] = [];
  @Input() optionsStatus: OptionDropdown[] = [];
  @Input() selectionMode: 'single' | 'multiple' | 'range' = 'single';
  @Input() controlName: string = '';
  @Input() invalid: string = '';
  @Input() placeholder: string = '';
  @Input() classSpan: string = '';

  // @Output() handleClick = new EventEmitter<any>();
  // @Output() handleDetail = new EventEmitter<any>();
  // @Output() handleSearch = new EventEmitter<any>();
  // @Output() handleCreate = new EventEmitter<any>();

  constructor(public submitService?: FormSubmitService) {
  }

  get control(): AbstractControl | null {
    return this.formGroup.get(this.controlName);
  }

  // getStatus(): boolean {
  //   if (!this.control) return false;
  //   const submitted = this.submitService?.getSubmitted();
  //   if (this.control.invalid && submitted) {
  //     return true;
  //   }
  //   return false;
  // }

  // getErrorMessage(): string {
  //   const errors = this.control?.errors;
  //   if (!errors) return '';
  //   if (errors['required']) {
  //     return 'Trường này bắt buộc';
  //   }
  //   if (errors['maxlength']) {
  //     return `Không được vượt quá ${errors['maxlength'].requiredLength} ký tự`;
  //   }
  //   console.log('errors', errors);

  //   return 'Dữ liệu không hợp lệ';
  // }

  // eventClick() {
  //   this.handleClick.emit();
  // }

  // detail(data: any) {
  //   this.handleDetail.emit(data);
  // }

  // search(data: any) {
  //   this.handleSearch.emit(data);
  // }

  // create() {
  //   this.handleCreate.emit();
  // }

  // createByData(data: any) {
  //   console.log(data);
    
  //   this.handleCreate.emit(data);
  // }
}
