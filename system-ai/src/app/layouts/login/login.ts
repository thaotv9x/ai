import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldConfig } from '../../core/model/field-config.model';
import { Router } from '@angular/router';
import { FormBuilderService } from '../../core/services/form-builder-form.service';
import { FormSubmitService } from '../../core/services/form-submit.service';
import { MoInputComponent } from "../../components/mo/mo-input-component/mo-input-component";
import { MoInputPasswordComponent } from "../../components/mo/mo-input-password-component/mo-input-password-component";
import { AtButtonComponent } from "../../components/at/at-button-component/at-button-component";
import { AtButtonIconComponent } from "../../components/at/at-button-icon-component/at-button-icon-component";

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MoInputComponent, MoInputPasswordComponent, AtButtonComponent, AtButtonIconComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  fieldConfigs!: Record<string, FieldConfig>;

  constructor(
    private readonly router: Router,
    private readonly fbService: FormBuilderService,
    private readonly formSubmitService: FormSubmitService
  ) {}

  ngOnInit() {
    const schema: Partial<FieldConfig>[] = [
      {
        key: 'username',
        label: 'Tên đăng nhập',
        placeholder: 'Nhập tên đăng nhập',
        required: true
      },
      {
        key: 'password',
        label: 'Mật khẩu',
        placeholder: 'Nhập mật khẩu',
        required: true,
        type: 'password'
      },
    ];
    console.log(schema);
    
    const { formGroup, fieldConfigs } = this.fbService.buildForm(schema);
    this.formGroup = formGroup;
    this.fieldConfigs = fieldConfigs;
  }

  onSubmit(): void {
    this.formSubmitService.setSubmitted();
    if (this.formGroup.valid) {
      console.log('Form login:', this.formGroup.value);
      const loginData = this.formGroup.value;

      localStorage.setItem('user', JSON.stringify(loginData.username));
      this.router.navigate(['/system']);
    }
  }
}
