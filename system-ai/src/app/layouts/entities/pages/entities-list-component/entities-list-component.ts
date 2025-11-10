import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-entities-list-component',
  imports: [ ReactiveFormsModule, CommonModule, FormsModule, TextareaModule],
  templateUrl: './entities-list-component.html',
  styleUrl: './entities-list-component.css',
})
export class EntitiesListComponent {
  message: string = '';
  selectedFiles: File[] = [];
  messages: ChatMessage[] = [];

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFiles.push(file);
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  sendMessage(): void {
    if (this.message || this.selectedFiles.length > 0) {
      // Chỉ khi gửi mới push file vào messages
      this.messages.push({
        text: this.message,
        user: true,
        files: [...this.selectedFiles],
      });

      // Reset khung input
      this.message = '';
      this.selectedFiles = [];
    }
  }
}


interface ChatMessage {
  text: string;
  user: boolean; // true = user, false = bot
  files?: File[];
}
