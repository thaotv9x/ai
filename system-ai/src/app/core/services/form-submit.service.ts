import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormSubmitService {
  private submitted = false;

  setSubmitted(): void {
    this.submitted = true;
  }

  getSubmitted(): boolean {
    return this.submitted;
  }

  reset(): void {
    this.submitted = false;
  }
}
