import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { AtButtonIconComponent } from "../../../../components/at/at-button-icon-component/at-button-icon-component";
import { EntitiesService, EntityGenerationResponse } from '../../services/entities-service';

@Component({
  selector: 'app-entities-list-component',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, TextareaModule, AtButtonIconComponent],
  templateUrl: './entities-list-component.html',
  styleUrl: './entities-list-component.css',
})
export class EntitiesListComponent {
  message: string = '';
  selectedFile?: File; // Chỉ 1 file
  result?: EntityGenerationResponse;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private readonly entitiesService: EntitiesService) { }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Chỉ giữ 1 file
    }
  }

  removeFile(): void {
    this.selectedFile = undefined;
  }

  sendFile(): void {
    if (!this.selectedFile) return;
    this.entitiesService.sendFile(this.selectedFile).subscribe({
      next: (response) => {
        this.result = response;
        this.saveToLocalStorage(this.result);
        this.clearFile();
      },
      error: (error) => {
        console.error('Upload failed:', error);
        this.clearFile();
      }
    });
  }

   // Download file Java
  downloadEntityFile(): void {
    const history = this.getFromLocalStorage();
    this.result = history[0]; // Lấy bản ghi mới nhất
    if (!this.result?.entityCode) return;

    const blob = new Blob([this.result.entityCode], { 
      type: 'text/x-java-source; charset=utf-8' 
    });
    
    const url = globalThis.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.result.fileName || 'Entity.java';
    link.click();
    
    globalThis.URL.revokeObjectURL(url);
  }

  // ✅ Lưu response vào localStorage
private saveToLocalStorage(response: any): void {
  try {
    const history = this.getFromLocalStorage();
    
    // Thêm response mới vào đầu mảng
    history.unshift({
      ...response,
      timestamp: new Date().toISOString()
    });
    
    // Giữ tối đa 50 bản ghi
    if (history.length > 50) {
      history.pop();
    }
    
    localStorage.setItem('entityGenerationHistory', JSON.stringify(history));
    
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

// ✅ Lấy dữ liệu từ localStorage
private getFromLocalStorage(): any[] {
  try {
    const data = localStorage.getItem('entityGenerationHistory');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return [];
  }
}

  private clearFile(): void {
    console.log(this.selectedFile);
    this.selectedFile = undefined;
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
