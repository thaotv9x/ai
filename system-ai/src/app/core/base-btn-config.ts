import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { ButtonSeverity } from 'primeng/button';

@Directive()
export abstract class BaseBtnConfig {
  @Input() label: string = '';
  @Input() customClass: string = 'w-full';
  @Input() disabled = false;
  @Input() icon: string = '';
  @Input() severity: ButtonSeverity = 'primary';

  /**
   * Sự kiện chung khi click nút (dùng cho tất cả các loại hành động)
   * - Payload (data) có thể là bất kỳ kiểu dữ liệu (any)
   * - Component cha bắt sự kiện này khi muốn xử lý click theo cách tổng quát
   */
  @Output() handleClick = new EventEmitter<any>();

  // Emit (phát) sự kiện handleClick ra ngoài component cha
  // data: dữ liệu muốn gửi kèm (có thể là object, string, số, v.v.)
  // Component cha sẽ bắt sự kiện này qua (handleClick)="tênHàm($event)"
  eventClick() {
    this.handleClick.emit();
  }
}
