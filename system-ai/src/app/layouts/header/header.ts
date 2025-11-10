import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AtButtonIconComponent } from "../../components/at/at-button-icon-component/at-button-icon-component";

@Component({
  selector: 'app-header',
  imports: [CommonModule, ReactiveFormsModule, AtButtonIconComponent],
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
