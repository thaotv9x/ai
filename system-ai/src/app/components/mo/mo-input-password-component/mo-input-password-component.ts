import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../../../core/base-field-valid-component';
import { AtInputPasswordComponent } from "../../at/at-input-password-component/at-input-password-component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mo-input-password-component',
  imports: [ReactiveFormsModule, CommonModule, AtInputPasswordComponent],
  templateUrl: './mo-input-password-component.html',
  styleUrl: './mo-input-password-component.css',
})
export class MoInputPasswordComponent extends BaseFieldComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.fieldConfig);
    
  }
    
}
