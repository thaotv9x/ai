import { Directive } from '@angular/core';
import { FormSubmitService } from './services/form-submit.service';
import { BaseFieldConfig } from './base-field-config';

@Directive()
export abstract class BaseFieldComponent extends BaseFieldConfig {
  constructor(private readonly formSubmitService: FormSubmitService) {
    super();
  }

  // Hàm kiểm tra control có đang ở trạng thái lỗi hay không
  isInvalid(): boolean {
    // Lấy FormControl từ fieldConfig (controlName ở đây có thể là một FormControl)
    const control = this.fieldConfig.controlName;
    // Kiểm tra: control có invalid và đã bị "touched" hoặc form đã được submit chưa
    const invalid =
      control?.invalid &&
      (control?.touched || this.formSubmitService.getSubmitted());
    // Gán trạng thái invalid vào fieldConfig để component cha có thể biết trạng thái này
    this.fieldConfig.invalid = invalid;

    // Trả về true nếu control đang invalid
    return invalid;
  }

  // Hàm lấy thông báo lỗi để hiển thị cho người dùng
  getErrorMessage(): string | null {
    // Lấy FormControl từ fieldConfig
    const control = this.fieldConfig.controlName;

    // Nếu control có lỗi
    if (control.errors) {
      // Lỗi bắt buộc nhập
      if (control.errors['required']) {
        return `${'Trường này'} là bắt buộc`;
      }
      // Lỗi vượt quá số ký tự cho phép
      if (control.errors['maxlength']) {
        return `Tối đa ${control.errors['maxlength'].requiredLength} ký tự`;
      }
      // Lỗi custom được truyền trực tiếp qua fieldConfig.nzStatus
    //   if (this.fieldConfig.invalid) {
    //     return this.fieldConfig.invalid; // lỗi custom truyền từ FieldConfig
    //   }
    }
    // Nếu không có lỗi nào thì trả về null
    return null;
  }
}
