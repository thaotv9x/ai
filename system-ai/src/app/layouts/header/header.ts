import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AtButtonComponent } from '../../components/at-button-component/at-button-component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ReactiveFormsModule, AtButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  userName = 'Nguyễn Văn A';

  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
